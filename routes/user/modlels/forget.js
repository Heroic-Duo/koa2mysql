/**
 * Created by Administrator on 2018/3/20 0020.
 */

const tools = require('../../../models/tools/mds.js');
const userModel = require('../../../db/mysql/user');
// const {User} = require('./db.js');
const jwt = require('jsonwebtoken');
const svgCaptcha = require('svg-captcha');
const sendEmail = require('./nodemailer')
const fs = require('fs');
const url = require('url');

class index {
    async index(ctx, next) {
        
        let user = {
            email: ctx.request.body.email,
            password: ctx.request.body.password,
            repeatpass: ctx.request.body.repeatpass,
            code: ctx.request.body.code,
            emailCode: ctx.request.body.emailCode
        }
        if (user.password !== user.repeatpass || user.email == '') {
            ctx.body = {        //应把这个逻辑放到前端
                code: 300,
                message: '账户密码不匹配或为空',
                status: 300
            };
        } else if (user.code.toLocaleLowerCase() == ctx.session.fotcode.toLocaleLowerCase()) {
            if (user.emailCode == ctx.session.emailCode) {
                // let res = await  userModel.insertData([user.email, tools.md5(user.password) ])
                if (user.email === ctx.session.emailFot) {
                    let result = await userModel.findDataByName(user.email)

                    if (result.length) {
                        await userModel.updatePass([tools.md5(user.password),user.email])
                        .then(res=>{
                           
                            ctx.body = {       
                                code: 200,
                                message: '更新成功',
                                status: 200
                            };
                        }).catch(err=>{
                            
                            ctx.body = {       
                                code: 500,
                                message: '服务器繁忙',
                                status: 500
                            };
                        })
                    } else {
                        ctx.body = {       
                            code: 305,
                            message: '用户未注册',
                            status: 305
                        };
                        // let res = await userModel.insertData([user.email, tools.md5(user.password)])
                        // console.log(res.insertId)
                        // await userModel.findDataByName(user.email)
                        //     .then((result) => {
                        //         if (result.length) {
                        //             ctx.session.id = res.insertId;
                        //             ctx.session.user = user.email;
                        //             ctx.session.avator = 'default.jpg';
                        //             ctx.body = {
                        //                 code: 200,
                        //                 message: '注册成功',
                        //                 status: 200
                        //             };
                        //             ctx.session.emailFot =''
                        //             ctx.session.emailCode =''
                        //         } else {
                        //             ctx.body = {
                        //                 code: 500,
                        //                 message: '服务器繁忙',
                        //                 status: 500
                        //             };
                        //         }

                        //     })

                    }
                } else {
                    ctx.body = {        //应把这个逻辑放到前端
                        code: 303,
                        message: '邮箱与邮箱验证不匹配',
                        status: 303
                    };
                }

            } else {
                ctx.body = {
                    code: 302,
                    message: '邮箱验证码错误',
                    status: 302
                }

            }
        } else {
            // console.log('验证码失败');
            ctx.body = {
                code: 301,
                message: '验证码不匹配',
                status: 301
            }

        }


    }
    async email(ctx, next) {


        let email = ctx.request.body.email;
        let code = ctx.request.body.code;

        let usercode = Math.ceil(Math.random() * 100000)
        ctx.session.emailCode = usercode
        console.log(ctx.session.emailCode, 'loooooo')
        ctx.session.emailFot = email
        var emailmailOptions = {
            from: "lanmo7758521@qq.com", //发送人
            to: email, //收件人
            subject: "养生传承堂_庄王", // 标题
            text: '验证码',
            html: "<h1>您邮箱修改密码验证码为  <p>" + usercode + "</p>    世界，如此美好！</h1>" // html 内容
        };
        var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (email == "") {
            return;
        }
        if (!reg.test(email)) {

            return;
        }
        if (code == "") {
            return;
        }
        if (code.toLocaleLowerCase() == ctx.session.fotcode.toLocaleLowerCase()) {
            let users = await userModel.findDataByName(email)
            if (users.length) {
                sendEmail(emailmailOptions);
                if (sendEmail) {
                    //定时器
                    ctx.body = {
                        message: "成功",
                        status: true,
                    }
                } else {
                    ctx.body = {
                        message: "发送失败",
                        status: 306,
                    }
                }
               
            } else {
                 ctx.body = {
                    message: "已注册",
                    status: 304,
                }

            }

        } else {
            ctx.body = {
                message: "验证码错误",
                status: false,
            }
        }
        return
    }
    //验证码
    async code(ctx, next) {
        var captcha = svgCaptcha.create({
            size: 4,
            fontSize: 50,
            width: 120,
            height: 50,
            background: "rgba(5, 93, 4, 0.85)"
        });
        // console.log(captcha.text,'ooooooooooooooo');

        //保存生成的验证码
        ctx.session.fotcode = captcha.text;
        //设置响应头
        ctx.response.type = 'image/svg+xml';
        ctx.body = captcha.data;
        // console.log(ctx.body,'llllllllllllllllll');
    }

}

module.exports = new index();

  /**
 * 定义一个变量 用于apiGroup 因为不支持直接输入中文
 * @apiDefine test 用户
 */
/**
 * @api {post} /apiUser/forget/index 找回接口
 * @apiName indexFo
* @apiGroup test
    * @apiDescription  用户找回接口 ，包括关联的验证码，邮箱验证码，流程是，通过验证码和邮箱号获取邮箱验证码，然后一起提交注册
    * @apiParam {string} email 邮箱号
    * @apiParam {string} password 密码
* @apiParam {string} repeatpass 确认密码
    * @apiParam {number} code 验证码
    * @apiParam {number} emailCode 邮箱验证码
    *                     
    *@apiParamExample 参数请求的事例
* {
    *     email:"taobao@qq.com",
    *     password:"123456",
    *     repeatpass:"123456",
    *     code:vrtg,
    *     emailCode:78234,
    * }
    
    * @apiSuccessExample  成功返回示例:
    * {
    *     code: 200,
    *     message: '注册成功',
    *     status: 200
    *     
    * }
    * @apiErrorExample  失败返回示例:
    * {
    *     code: 300,
    *     message: '账户密码不匹配或为空',
    *     status: 300
    *     
    * },
    * @apiErrorExample  失败返回示例:
    * {
    *     code: 304,
    *     message: '用户存在',
    *     status: 304
    *     
    * },
    */

/**
 * @api {post} /apiUser/forget/email 找回邮箱接口
 * @apiName emailFo
* @apiGroup test
    * @apiDescription  用户找回邮箱接口 ，关联的邮箱验证码，通过邮箱发送验证码
    * @apiParam {string} email 邮箱号
    * @apiParam {number} code 验证码
    *                     
    *@apiParamExample 参数请求的事例
    * {
    *     email:"taobao@qq.com",
    *     code:vrtg,
    * }
    
    * @apiSuccessExample  成功返回示例:
    * {
    *     code: 200,
    *     message: '发送成功',
    *     status: 200
    *     
    * }
    * @apiErrorExample  失败返回示例:
    * {
    *     code: 301,
    *     message: '验证码错误',
    *     status: 301
    *     
    * },
    * @apiErrorExample  失败返回示例:
    * {
    *     code: 304,
    *     message: '用户存在',
    *     status: 304
    *     
    * },
    */
/**
 * @api {get} /apiUser/forget/code 找回验证码接口
 * @apiName codeFo
* @apiGroup test
    * @apiDescription  用户找回验证码接口 ，关联的验证码， 不传参数
     *@apiParamExample 参数请求的事例
    * {
    *     
    *     
    * }
    
    * @apiSuccessExample  成功返回示例:
    * {
    *     
    *     返回是图形验证码,
    *     文字=图片
    *     
    *     
    * }
    * @apiErrorExample  失败返回示例:
    * {
    *     
    *     
    *     
    *     
    * },
    */