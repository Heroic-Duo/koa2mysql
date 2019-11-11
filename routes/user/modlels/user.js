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
const path = require('path');


class index {
    async upData(ctx, next) {
       
        let email=ctx.request.body.email,
        code=ctx.request.body.code,
        data=ctx.request.body.data;
        data.last_modified_time = moment().format('YYYY-MM-DD HH:mm');
        
        if (email == '' || code == '') {
            ctx.body = {        //应把这个逻辑放到前端
                code: 300,
                message: '账户密码不匹配或为空',
                status: 300
            };
        } else if (code.toLocaleLowerCase() == ctx.session.uscode.toLocaleLowerCase()) {
            let _sql = `SELECT * from users where email="${email}"`
            let result =  await userModel.query(_sql) 
            if (result.length) {
                let inData = `update users set "${data}" where email="${email}"`
                await userModel.query(inData).then((res) => {
                   console.log(res,'ppppppppp')
                })
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
        ctx.session.uscode = captcha.text;
        //设置响应头
        ctx.response.type = 'image/svg+xml';
        ctx.body = captcha.data;
        // console.log(ctx.body,'llllllllllllllllll');
    }
    async upImg(ctx, next) {
        
        let id=Number(ctx.request.body.id)
        // Number(ctx.request.body.pageSize)
        // console.log(ctx.request.files);
        // console.log(`${Number(id)}`,'pppppppppp');
        
        if (id == '') {
            ctx.body = { 
                code: 301,
                message: '用户不能为空',
                status: 301,
               
            }
        }else  {
           
            let _sql = `SELECT * from users where id=${id}`
 
            let result = await userModel.query(_sql) 
           
            if (result.length){
                const file = ctx.request.files.file  // 手动相对路径
                const basename = path.basename(file.path)  //配置整体路劲
                result[0].avator = basename
                let avator = `update users set avator="${basename}" where id=${id}`
                await userModel.query(avator).then(res=>{
                    ctx.body = { 
                        code: 200,
                        message: '更新成功',
                        status: 200,
                        basename: basename,
                        url: `${ctx.origin}/uploads/${basename}`
                    }
                }).catch(err=>{
                    ctx.body = { 
                        code: 450,
                        message: '更新失败',
                        status: 450,
                    }
                })
               
          
            }else{
                ctx.body = { 
                    code: 405,
                    message: '用户不存在',
                    status: 405,
                   
                }
            }
            const file = ctx.request.files.file  // 手动相对路径
            const basename = path.basename(file.path)  //配置整体路劲
            
        }
        // if (ctx.request.files.file) {
        //     const file = ctx.request.files.file  // 手动相对路径
        //     // ctx.body = { 
        //     //     code: 200,
        //     //     message: '上传成功',
        //     //     status: 200,
        //     //     path: file.path,
        //     //     file:file,
        //     // }
        //     const basename = path.basename(file.path)  //配置整体路劲
  
        //     ctx.body = { 
        //         code: 200,
        //         message: '上传成功',
        //         status: 200,
        //         url: `${ctx.origin}/uploads/${basename}`
        //     }
            
        // }else{
        //     ctx.body = { 
        //         code: 405,
        //         message: '上传失败',
        //         status: 405,
        //         path: file.path,
        //         file:file
        //     }
        // }
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