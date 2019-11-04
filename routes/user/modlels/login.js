/**
 * Created by Administrator on 2018/3/20 0020.
 */

const tools = require('../../../models/tools/mds.js');
const userModel = require('../../../db/mysql/user');
// const {User} = require('./db.js');
const jwt = require('jsonwebtoken');
const svgCaptcha = require('svg-captcha');

const jwtKoa = require('koa-jwt');

const   secret = 'secret',// 注册是加密
        util = require('util'),// 解密
        verify = util.promisify(jwt.verify) ;// 解密


class index {

    async index(ctx, next) {

        let user = {
            email: ctx.request.body.email,
            password: ctx.request.body.password,
            code: ctx.request.body.code,
        }
        if (user.code === '' || user.password === '' || user.email === '') {
            ctx.body = {
                message: '账户密码验证不能为空',
                status: 300,
                token
            }
            
        } else if (user.code.toLocaleLowerCase() === ctx.session.code.toLocaleLowerCase()) {
            let res=await userModel.findDataByName(user.email)
            // console.log(tools.md5(user.password),'aaaaaaaaaa')
            if (res.length) {
                if (res[0].pass === tools.md5(user.password)) {
                 const token = jwt.sign({ user: user.email, password: user.password }, secret, { expiresIn: '1h' })  //token签名 有效期为1小时
                    ctx.body = {
                        message: '登录成功',
                        status: 200,
                        data:res[0],
                        token
                    }
                    
                }else{
                    ctx.body = {
                        message: '账户密码不匹配',
                        status: 310,

                    }
                }
               
            }else{
                ctx.body = {
                    message: '账号未注册',
                    status: 300,
                }
            }
               
        }else{
            ctx.body = {
                message: '验证码错误',
                status: 301,
            }
        }
    }

    async code(ctx, next) {
        var captcha = svgCaptcha.create({
            size: 4,
            fontSize: 50,
            width: 120,
            height: 50,
            background: "rgba(5, 93, 4, 0.85)"
        });
        //console.log(captcha.text);

        //保存生成的验证码
        ctx.session.code = captcha.text;
        //设置响应头
        ctx.response.type = 'image/svg+xml';
        ctx.body = captcha.data;
    }
}
module.exports = new index();

  /**
 * 定义一个变量 用于apiGroup 因为不支持直接输入中文
 * @apiDefine test 用户
 */
/**
 * @api {post} /apiUser/login/index 登录接口
 * @apiName indexLO
* @apiGroup test
    * @apiDescription  用户登录接口 ，包括关联的验证码，邮箱验证码，流程是，通过验证码和邮箱号获取邮箱验证码，然后一起提交登录
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
    *     message: '登录成功',
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
 * @api {post} /apiUser/login/email 登录邮箱接口
 * @apiName emailLO
* @apiGroup test
    * @apiDescription  用户登录邮箱接口 ，关联的邮箱验证码，通过邮箱发送验证码
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
 * @api {get} /apiUser/login/code 登录验证码接口
 * @apiName codeLo
* @apiGroup test
    * @apiDescription  用户登录验证码接口 ，关联的验证码， 不传参数
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