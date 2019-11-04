const router = require('koa-router')();

const tools=require('./../../../model/tools.js');

const DB=require('./../../../model/db.js');
var svgCaptcha = require('svg-captcha');


router.get('/',async (ctx)=>{
    ctx.body="api接口";
})



router.get('/code',async (ctx)=>{
    //ctx.body='验证码';


    //加法的验证码
    //var captcha = svgCaptcha.createMathExpr({
    //    size:4,
    //    fontSize: 50,
    //    width: 100,
    //    height:40,
    //    background:"#cc9966"
    //});

    var captcha = svgCaptcha.create({
        size:4,
        fontSize: 50,
        width: 120,
        height:50,
        background:"#cc9966"
    });
    //console.log(captcha.text);

    //保存生成的验证码
    ctx.session.code=captcha.text;
    //设置响应头
    ctx.response.type = 'image/svg+xml';
    ctx.body=captcha.data;
})

module.exports=router.routes();