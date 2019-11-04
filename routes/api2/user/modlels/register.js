/**
 * Created by Administrator on 2018/3/20 0020.
 */

const tools=require('./../../../models/tools/mds.js');

const {User} = require('./db.js');
const jwt = require('jsonwebtoken');
var svgCaptcha = require('svg-captcha');
const fs = require('fs');
var url=require('url');


const findOne = (query, filter={}) => {
    return new Promise((resolve,reject) => {
      User.find(query, filter, function(err, user) {
        if (err) reject(err);
        resolve(user);
      });
    });
  };
  const createOne = (body) => {
    return new Promise((resolve, reject) => {
      const newUser = new User(Object.assign(body, { avatar_url: `https:${gravatar.url(body.email)}` }));
      newUser.save(function(err, info) {
        if (err) reject(err);
      
        resolve(info);
      });
    });
  };


class index {
    async index(ctx, next) {
        try {
            console.log(ctx.request.body);
            let email=ctx.request.body.email;
            let password=ctx.request.body.password;
            let code=ctx.request.body.code;
            console.log(tools.md5(password));
            console.log(ctx.session.info);



    if(code==ctx.session.code){

        let result=await findOne({ loginname });
        if (result.length>0) {
             ctx.body = {
                message: "已注册",
                status:false,
            }
        } else {
        let result=await  createOne(Object.assign(ctx.request.body, {
          creat_time: new Date(),
        }));
            ctx.body = {
                message:"成功" ,
                status:true,
            }
        }
    }else{
        console.log('验证码失败');
         ctx.body = {
            message:"验证码失败",
            status:false,
        }
        
    }
        } catch (e) {
            /* 忽略错误，继续执行 */
            ctx.body = {
                message: '错误',
                status: e,
            }
        }

    }

    //验证码
    async code(ctx, next) {
        var captcha = svgCaptcha.create({
            size:4,
            fontSize: 50,
            width: 120,
            height:50,
            background:"#cc9966"
        });
        console.log(captcha.text,'ooooooooooooooo');
    
        //保存生成的验证码
        ctx.session.code=captcha.text;
        //设置响应头
        ctx.response.type = 'image/svg+xml';
        ctx.body=captcha.data;
        console.log(ctx.body,'llllllllllllllllll');
    }

}

module.exports = new index();