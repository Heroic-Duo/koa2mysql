/**
 * Created by Administrator on 2018/3/20 0020.
 */

const tools = require('../../../models/tools/mds.js');
const userModel = require('../../../db/mysql/mysql');
// const {User} = require('./db.js');
const jwt = require('jsonwebtoken');
const svgCaptcha = require('svg-captcha');
const sendEmail = require('./nodemailer');
const moment = require('moment');
const fs = require('fs');
const url = require('url');

class index {
    async index(ctx, next) {
       
        console.log(ctx.request.body, 'aaaaaaaaa')
        let user = {
            email: ctx.request.body.email,
            password: ctx.request.body.password,
            repeatpass: ctx.request.body.repeatpass,
            code: ctx.request.body.code,
            nickname:ctx.request.body.nickname,
            emailCode: ctx.request.body.emailCode,
            time:moment().format('YYYY-MM-DD HH:mm'),
        }
        if (user.password !== user.repeatpass || user.email == '') {
            ctx.body = {        //应把这个逻辑放到前端
                code: 300,
                message: '账户密码不匹配或为空',
                status: 300
            };
        } else if (user.code.toLocaleLowerCase() == ctx.session.rscode.toLocaleLowerCase()) {
            if (user.emailCode == ctx.session.emailCode) {
                if (user.email === ctx.session.emailReg) {
                    let _sql = `SELECT * from users where email="${user.email}"`
                    let result =  await userModel.query(_sql)   
                    if (result.length) {
                        ctx.body = {       
                            code: 304,
                            message: '用户存在',
                            status: 304
                        };
                    } else {

                        let  inData= `insert into users(email,password,nickname,created_time) values("${user.email}","${ tools.md5(user.password)}","${user.nickname}","${user.time}")`
                        await userModel.query(inData)
                        await userModel.findDataByName(user.email)
                            .then((result) => {
                                if (result.length) {
                                 
                                    ctx.body = {
                                        code: 200,
                                        message: '注册成功',
                                        status: 200
                                    };
                                    ctx.session.emailReg =''
                                    ctx.session.emailCode =''
                                } else {
                                    ctx.body = {
                                        code: 500,
                                        message: '服务器繁忙',
                                        status: 500
                                    };
                                }

                            })

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
                    message: '邮箱验证码与邮箱不匹配',
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
        console.log(ctx.request.body.code, 'loooooo')
        let usercode = Math.ceil(Math.random() * 100000)
        ctx.session.emailCode = usercode
        console.log(ctx.session.emailCode, 'loooooo')
        ctx.session.emailReg = email
        var emailmailOptions = {
            from: "lanmo7758521@qq.com", //发送人
            to: email, //收件人
            subject: "养生传承堂_庄王", // 标题
            text: '验证码',
            html: "<h1>您的邮箱验证码为  <p>" + usercode + "</p>    世界，如此美好！</h1>" // html 内容
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
        if (code.toLocaleLowerCase() == ctx.session.rscode.toLocaleLowerCase()) {
            // let _sql = `SELECT * from users where email="${name}"`
            let users = await userModel.findDataByName(email)
            console.log(users,'pppppppp')
            if (users.length) {
                console.log(users,'pppppppp')
                ctx.body = {
                    message: "已注册",
                    status: 304,
                }
            } else {
                sendEmail(emailmailOptions);
                if (sendEmail) {
                    //定时器
                    ctx.body = {
                        message: "发送成功",
                        status: true,
                    }
                } else {
                    ctx.body = {
                        message: "发送失败",
                        status: 306,
                    }
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
        ctx.session.rscode = captcha.text;
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
 * @api {post} /apiUser/register/index 注册接口
 * @apiName indexRE
* @apiGroup test
    * @apiDescription  用户注册接口 ，包括关联的验证码，邮箱验证码，流程是，通过验证码和邮箱号获取邮箱验证码，然后一起提交注册
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
 * @api {post} /apiUser/register/email 注册邮箱接口
 * @apiName emailRe
* @apiGroup test
    * @apiDescription  用户注册邮箱接口 ，关联的邮箱验证码，通过邮箱发送验证码
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
 * @api {get} /apiUser/register/code 注册验证码接口
 * @apiName codeRe
* @apiGroup test
    * @apiDescription  用户注册验证码接口 ，关联的验证码， 不传参数
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