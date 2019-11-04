/**
 * Created by Administrator on 2018/3/20 0020.
 */

const tools = require('./../../../../models/tools/mds.js');
const userModel = require('../../../../db/mysql/luntan');
// const {User} = require('./db.js');
const jwt = require('jsonwebtoken');
const svgCaptcha = require('svg-captcha');
const moment = require('moment');

const fs = require('fs');
const url = require('url');

class index {
    async listpublish(ctx, next) {
        let  size = 10, page = 2 ;

        let types= ctx.request.body.types
        let article = {
            type : ctx.request.body.type,
            title : ctx.request.body.title,
            name: ctx.request.body.name,
            content : ctx.request.body.content,
            avator : ctx.request.body.avator,
            time : moment().format('YYYY-MM-DD HH:mm'),
            uid : ctx.request.body.id,
            quanxian:ctx.request.body.id,
    
        }
      
        if(article.type ==''||article.content.length<20){
            ctx.body = {        
                code: 300,
                message: '参数不能为空',
                status: 300
            };
        }else if (article.quanxian !=='') {
            
            
            await userModel.insertPost([article.name,article.title,article.content,article.uid,article.time,article.type,article.avator])
                    .then(res=>{
                        ctx.body = 1;
                      
                        ctx.body = {        
                            code: 200,
                            message: '发表成功',
                            status: 200
                        };
                    }).catch((err)=>{
                       
                        ctx.body = {        
                            code: 405,
                            message: '发表失败',
                            status: 405
                        };
                    })

        }else{
            ctx.body = {        
                code: 450,
                message: '权限不够',
                status: 450
            };
        }
    }
    async listdelete(ctx, next) {
        
        let id = Number(ctx.request.body.id)
        let uid = Number(ctx.request.body.uid)
        if (id =='' || id ==null || id == undefined ||  uid =='' || uid ==null || uid == undefined) {
            ctx.body = {        
                code: 300,
                message: '参数不能为空',
                status: 300
            };
        }else {
           
            let _sql = `SELECT * from posts where id="${id}"`
            let idS =  await userModel.query(_sql)

            let _sql2 = `SELECT * from users where id="${uid}"`
            let uids =  await userModel.query(_sql2)
            
            if (idS[0].uid == uid) {
                   await userModel.deletePost(id)
                    .then(res=>{
                        ctx.body = {        
                            code: 200,
                            message: '删除成功',
                            status: 200
                        };
                    }).catch(err=>{
                        ctx.body = {        
                            code: 405,
                            message: '未找到数据',
                            status: 405
                        };
                    })  
            }else if (uids[0].job == null ||uids[0].job !== '' ){
                    await userModel.deletePost(id)
                    .then(res=>{
                        ctx.body = {        
                            code: 200,
                            message: '删除成功',
                            status: 200
                        };
                    }).catch(err=>{
                        ctx.body = {        
                            code: 405,
                            message: '未找到数据',
                            status: 405
                        };
                    })  
            }else{
                ctx.body = {        
                    code: 450,
                    message: '权限不够',
                    status: 450
                };
            }
        }
    }
    async listfans(ctx, next) {
        let id = Number(ctx.request.body.id)
        let uid = Number(ctx.request.body.uid)
      
        if (id =='' || id ==null || id == undefined ||  uid =='' || uid ==null || uid == undefined) {
            ctx.body = {        
                code: 300,
                message: '参数不能为空',
                status: 300
            };
        }else if(id ===uid){
            ctx.body = {        
                code: 401,
                message: '自己不能关注自己',
                status: 401
            };
        }else{
          
            // let _sql = `insert into follow(uid,fwid) values(${uid},${id})`
            // let foll =  await userModel.query(_sql)
            let _sql = `SELECT * from follow where uid=${uid} and fwid=${id}`
            let foll =  await userModel.query(_sql)
            if (foll.length) {
                let _sql1 = `delete from follow where uid=${uid} and fwid=${id}`
                let foll =  await userModel.query(_sql1)
                .then(()=>{
                    ctx.body = {        
                        code: 200,
                        message: '取消成功',
                        status: 200
                    };
                }).catch(err=>{ 
                    ctx.body = {        
                        code: 405,
                        message: '关注失败',
                        status: 405
                    };
                })

            }else{
                let _sql1 = `insert into follow(uid,fwid) values(${uid},${id})`
                let foll =  await userModel.query(_sql1)
                .then(()=>{
                    ctx.body = {        
                        code: 200,
                        message: '关注成功',
                        status: 200
                    };
                }).catch(err=>{ 
                    ctx.body = {        
                        code: 405,
                        message: '关注失败',
                        status: 405
                    };
                })
            }
        }
    }
    async commentpublish(ctx, next) {
        let  size = 10, page = 2 ;
        let postid = ctx.request.body.postid,
            content = ctx.request.body.content,
            avator= ctx.request.body.avator,
            name = ctx.request.body.name,
            time = moment().format('YYYY-MM-DD HH:mm'),
            uid = ctx.request.body.id,
            quanxian=ctx.request.body.id;
            console.log(content,'ssss')
        if(postid ==''||content.length<20 || avator=='' ||name=='' ){
            ctx.body = {        
                code: 300,
                message: '参数不能为空',
                status: 300
            };
        }else if (quanxian !=='') {
            // let _sql = "insert into comment(name,content,moment,postid,avator) values(?,?,?,?,?);"
            await userModel.insertComment([name,content,time,postid,avator])
            .then(result=>{
               
                ctx.body = {        
                    code: 200,
                    message: '发表成功',
                    status: 200
                };
            }).catch(err=>{
                ctx.body = {        
                    code: 405,
                    message: '发表失败',
                    status: 405
                };
            });
        }else{
            ctx.body = {        
                code: 450,
                message: '权限不够',
                status: 450
            };
        }
    }
    async commentdelete(ctx, next) {
        
        let id = Number(ctx.request.body.id)
        let uid = Number(ctx.request.body.uid)
        if (id =='' || id ==null || id == undefined ||  uid =='' || uid ==null || uid == undefined) {
            ctx.body = {        
                code: 300,
                message: '参数不能为空',
                status: 300
            };
        }else {
           
            let _sql = `SELECT * from comment where id="${id}"`
            let idS =  await userModel.query(_sql)

            let _sql2 = `SELECT * from post where id="${uid}"`
            let uids =  await userModel.query(_sql2)
            
            if (idS[0].uid == uid) {
                   await userModel.deletePost(id)
                    .then(res=>{
                        ctx.body = {        
                            code: 200,
                            message: '删除成功',
                            status: 200
                        };
                    }).catch(err=>{
                        ctx.body = {        
                            code: 405,
                            message: '未找到数据',
                            status: 405
                        };
                    })  
            }else if (uids[0].job == null ||uids[0].job !== '' ){
                    await userModel.deletePost(id)
                    .then(res=>{
                        ctx.body = {        
                            code: 200,
                            message: '删除成功',
                            status: 200
                        };
                    }).catch(err=>{
                        ctx.body = {        
                            code: 405,
                            message: '未找到数据',
                            status: 405
                        };
                    })  
            }else{
                ctx.body = {        
                    code: 450,
                    message: '权限不够',
                    status: 450
                };
            }
        }
    }
}

module.exports = new index();

  /**
 * 定义一个变量 用于apiGroup 因为不支持直接输入中文
 * @apiDefine test 论坛
 */
/**
 * @api {post} /api/luntan/user/list/publish 帖子发布
 * @apiName listI
* @apiGroup test
    * @apiDescription  论坛帖子发布版块，user目录下所有接口都要登录后才可以发送，header携带token
    * @apiParam {string} type 类型(qqsh,xuejia,zhenci,shiwu,zhongyang)
    * @apiParam {string} title 标题
    * @apiParam {string} content 内容
    * @apiParam {string} avator 头像名称
    * @apiParam {number} id 用户ID
    * @apiParam {string} name 用户昵称            
    *@apiParamExample 参数请求的事例
    * {
    *     type:"qqsh",
    *     title:"如何升仙",
    *     content:"帖子内容",
    *     avator:"asdkhw.png",
    *     id:2,
    *     name:"王二虎",
    * }
    
    * @apiSuccessExample  成功返回示例:
    * {
    *     "code": 200,
    *     "message": '发布成功',
    *     "status": 200,
    *     
    * }
    * * @apiSuccessExample  成功返回示例:
    * {
    *     "code": 450,
    *     "message": '权限不够',
    *     "status": 450
    *     
    * },
    * @apiErrorExample  失败返回示例:
    * {
    *     "code": 300,
    *     "message": '参数不能为空',
    *     "status": 300
    *     
    * },
  
    */

/**
 * @api {post} /api/luntan/user/comment/delete 帖子删除
 * @apiName commentL
* @apiGroup test
    * @apiDescription  论坛帖子删除 ，
    * @apiParam {number} id 类型(帖子ID)
    * @apiParam {number} uid 用户ID
    * 
    *                     
    *@apiParamExample 参数请求的事例
    * {
    *     id:1,
    *     uid:3,
    *     
    * }
    
    * @apiSuccessExample  成功返回示例:
    * {
    *     "code":200,
    *     "message":"删除成功",
    *     "status":200,
    *
    * }
     * @apiSuccessExample  成功返回示例:
    * {
    *     "code": 450,
    *     "message": '权限不够',
    *     "status": 450
    *     
    * },
    * @apiErrorExample  失败返回示例:
    * {
    *     "code": 300,
    *     "message": '参数为空',
    *     "status": 300
    *     
    * },
   
    */
/**
 * @api {post} /api/api/luntan/user/list/fans 关注与取消用户
 * @apiName listF
    * @apiGroup test
    * @apiDescription  论坛关注用户，如果未关注，则关注。如果已关注，再次请求则取消
    * 
    * @apiParam {number} id 被关注者ID
    * @apiParam {number} uid 当前用户的ID
    *                     
    *@apiParamExample 参数请求的事例
    * {
    *     id:"2",
    *     uid:1,
    *     
    * }
     * @apiSuccessExample  成功返回示例:
    * {
    *     "code":200,
    *     "message":"关注成功",
    *     "status":200,
    *     
    * }
    * @apiErrorExample  失败返回示例:
     * {
    *     "code": 300,
    *     "message": '参数为空',
    *     "status": 300
    *     
    * },
    */
/**
 * @api {post} /api/luntan/user/comment/publish 评论发布
 * @apiName commentI
* @apiGroup test
    * @apiDescription  论坛评论发布版块，点击评论按钮，评论发布
    *
    * @apiParam {number} postid 帖子ID
    * @apiParam {string} content 内容
    * @apiParam {string} avator 用户头像名称
    * @apiParam {number} id 用户ID
    * @apiParam {string} name 用户昵称            
    *@apiParamExample 参数请求的事例
    * {
    *     
    *     postid:7,
    *     content:"评论内容",
    *     avator:"asdkhw.png",
    *     id:2,
    *     name:"王二虎",
    * }
    
    * @apiSuccessExample  成功返回示例:
    * {
    *     "code": 200,
    *     "message": '评论成功',
    *     "status": 200,
    *     
    * }
    * * @apiSuccessExample  成功返回示例:
    * {
    *     "code": 450,
    *     "message": '权限不够',
    *     "status": 450
    *     
    * },
    * @apiErrorExample  失败返回示例:
    * {
    *     "code": 300,
    *     "message": '参数不能为空',
    *     "status": 300
    *     
    * },
  
    */

/**
 * @api {post} /api/luntan/user/comment/delete 评论删除
 * @apiName commentL
* @apiGroup test
    * @apiDescription  论坛评论删除 ，
    * @apiParam {number} id 类型(评论ID)
    * @apiParam {number} uid 用户ID
    * 
    *                     
    *@apiParamExample 参数请求的事例
    * {
    *     id:1,
    *     uid:3,
    *     
    * }
    
    * @apiSuccessExample  成功返回示例:
    * {
    *     "code":200,
    *     "message":"删除成功",
    *     "status":200,
    *
    * }
     * @apiSuccessExample  成功返回示例:
    * {
    *     "code": 450,
    *     "message": '权限不够',
    *     "status": 450
    *     
    * },
    * @apiErrorExample  失败返回示例:
    * {
    *     "code": 300,
    *     "message": '参数为空',
    *     "status": 300
    *     
    * },
   
    */