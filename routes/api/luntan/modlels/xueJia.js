/**
 * Created by Administrator on 2018/3/20 0020.
 */

const tools = require('./../../../../models/tools/mds.js');
const userModel = require('../../../../db/mysql/mysql');
// const {User} = require('./db.js');
const jwt = require('jsonwebtoken');
const svgCaptcha = require('svg-captcha');

const fs = require('fs');
const url = require('url');

class index {
    async index(ctx, next) {
        let  size = 10, page = 2 ;

        let types= ctx.request.body.types

        if ( types == '') {
            ctx.body = {        //应把这个逻辑放到前端
                code: 300,
                message: '参数不能为空',
                status: 300
            };
        } else {
         
            let _sql = `select * from posts limit 0,10`;
            await userModel.query(_sql)
            .then(result=>{
                if (result.length) {
                     ctx.body = {        
                        code: 200,
                        message: '请求成功',
                        status: 200,
                        data:result
                    };
                }else{
                    ctx.body = {        
                        code: 405,
                        message: '未找到数据',
                        status: 405
                    };
                }
            })
        }
    }
    async list(ctx, next) {
        let  types=ctx.request.body.types,
        currentPage = Number(ctx.request.body.currentPage),
        pageSize = Number(ctx.request.body.pageSize)
        
        if (types ==''|| pageSize =='' || currentPage =='') {
            ctx.body = {        
                code: 300,
                message: '参数不能为空',
                status: 300
            };
        }else{
            let skip= (currentPage - 1) * pageSize,
            limit= pageSize
            let _sql = `select * from posts limit ${skip},${limit}`;
            
            let tole= `select * from posts`;
            let total =  await userModel.query(tole)
            await userModel.query(_sql)
            .then(result=>{

                if (result.length) {
                     ctx.body = {        
                        code: 200,
                        message: '请求成功',
                        status: 200,
                        data:result,
                        pagination: {
                            total:total.length,
                            currentPage,
                            pageSize
                        }
                    };
                }else{
                    ctx.body = {        
                        code: 405,
                        message: '未找到数据',
                        status: 405
                    };
                }
            })
        }
    }
    async details(ctx, next) {

        
        let  postId= ctx.request.body.postId,
            currentPage = Number(ctx.request.body.currentPage),
            pageSize = Number(ctx.request.body.pageSize)
        
        if (postId =='') {
            ctx.body = {        
                code: 300,
                message: '参数不能为空',
                status: 300
            };
        }else{
            let skip= (currentPage - 1) * pageSize,
            limit= pageSize
            let _sql = `select * from comment where postid = "${postId}" limit ${skip},${limit}`;
            
            // let skip= Number((currentPage - 1) * pageSize),
            // limit= Number(pageSize)
            let total =  await userModel.query(_sql)
            await userModel.query(_sql)
            .then(result=>{
                if (result.length) {
                     ctx.body = {        
                        code: 200,
                        message: '请求成功',
                        status: 200,
                        data:result,
                        pagination: {
                            total:total.length,
                            currentPage,
                            pageSize
                        }
                    };
                }else{
                    ctx.body = {        
                        code: 405,
                        message: '未找到数据',
                        status: 405
                    };
                }
            })
        }
    }

}

module.exports = new index();

  /**
 * 定义一个变量 用于apiGroup 因为不支持直接输入中文
 * @apiDefine test 论坛
 */
/**
 * @api {post} /api/luntan/xuejia/index 学家版块
 * @apiName luntanX
* @apiGroup test
    * @apiDescription  论坛学家版块 ，进入论坛首页后，会显示五个版块的10条点击率高的数据，此接口是获取学家板块点击率高的
    * @apiParam {string} types 类型(xuejia)
                 
    *@apiParamExample 参数请求的事例
    * {
    *     types:"xuejia",
    * }
    
    * @apiSuccessExample  成功返回示例:
    * {
    *     "code": 200,
    *     "message": '请求成功',
    *     "status": 200
    *     
    * }
    * * @apiSuccessExample  成功返回示例:
    * {
    *     "code": 405,
    *     "message": '未找到数据',
    *     "status": 405
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
 * @api {post} /api/luntan/xuejia/list 学家列表版块
 * @apiName xuejiaL
* @apiGroup test
    * @apiDescription  论坛学家所有列表版块 ，点击论坛首页学家板块后，会显示所有列表数据，此接口是获取所有列表数据
    * @apiParam {string} types 类型(daojia,rujia)
    * @apiParam {number} currentPage 页数 1开始
    * @apiParam {number} pageSize 当页的条数
    *                     
    *@apiParamExample 参数请求的事例
    * {
    *     types:"daojia",
    *     currentPage:1,
    *     pageSize:10,
    * }
    
    * @apiSuccessExample  成功返回示例:
    * {
    *     "code":200,
    *     "message":"请求成功",
    *     "status":200,
    *     "pagination":
    *        {
    *          "total":23,
    *          "currentPage":1,
    *          "pageSize":10
    *        }
    *     "data":
          [
            {
              "id":1,
              "name":"admin",
              "title":"前端js",
              "content":"<span>javascrip</span>",
              "uid":1,"moment":"2019-10-25 23:09",
              "comments":"1",
              "pv":"19",
              "likes":3,
              "type":"javascript",
              "avator":"default.jpg",
              "collection":2
            },
            {
              "id":2,
              "name":"admin",
              "title":"弄得",
              "content":"\p; 我去请问呜呜呜呜呜6</span>",
              "uid":1,
              "moment":"2019-11-01 19:44",
              "comments":"0",
              "pv":"0"
              ,"likes":0,
              "type":"node",
              "avator":"2019-10-25-820.png",
              "collection":0
            }
          ],
    *      .......
    *     
    * }
     * @apiSuccessExample  成功返回示例:
    * {
    *     "code": 405,
    *     "message": '未找到数据',
    *     "status": 405
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
 * @api {post} /api/luntan/xuejia/details 学家详情页版块
 * @apiName xuejiaD
    * @apiGroup test
    * @apiDescription  论坛学家详情页版块
    * @apiParam {string} postId ID
    * @apiParam {number} currentPage 页数 1开始
    * @apiParam {number} pageSize 当页的条数
    *                     
    *@apiParamExample 参数请求的事例
    * {
    *     postId:"2",
    *     currentPage:1,
    *     pageSize:10,
    * }
     * @apiSuccessExample  成功返回示例:
    * {
    *     "code":200,
    *     "message":"请求成功",
    *     "status":200,
    *     "pagination":
    *        {
    *          "total":23,
    *          "currentPage":1,
    *          "pageSize":10
    *        }
    *     "data":
          [
            {
              "id":1,
              "name":"admin",
              "title":"前端js",
              "content":"<span>javascrip</span>",
              "uid":1,"moment":"2019-10-25 23:09",
              "comments":"1",
              "pv":"19",
              "likes":3,
              "type":"javascript",
              "avator":"default.jpg",
              "collection":2
            },
            {
              "id":2,
              "name":"admin",
              "title":"弄得",
              "content":"\p; 我去请问呜呜呜呜呜6</span>",
              "uid":1,
              "moment":"2019-11-01 19:44",
              "comments":"0",
              "pv":"0"
              ,"likes":0,
              "type":"node",
              "avator":"2019-10-25-820.png",
              "collection":0
            }
          ],
    *      .......
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