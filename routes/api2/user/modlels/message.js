const router = require('koa-router')();

const tools=require('./../../../model/tools.js');

const DB=require('./../../../model/db.js');
var svgCaptcha = require('svg-captcha');


router.get('/',async (ctx)=>{
    ctx.body="api接口";
})

router.post('/data',async (ctx)=>{
    // let sname=ctx.query.name;
    let sname=ctx.request.body.name
    const data=await DB.find('user',{'username':sname});
    //console.log(result);
    if (data.length<=0) {
       ctx.body={
            message:'失败',
            status:false
        }
        
    }else{
        ctx.body={
            message:'成功',
            status:true,
            data:data[0]
        }       
    }
})

module.exports=router.routes();