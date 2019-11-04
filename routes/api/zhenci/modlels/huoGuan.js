

const { HuoGuan } = require('./db.js');

const findTopic = function (obj, filter, limit, skip) {
    return new Promise((resolve, reject) => {
        Topic.find(obj, filter, (err, topics) => {
            if (err) reject(err);
            resolve(topics);
        }).sort({ top: -1, good: -1, last_reply_at: -1, create_at: -1 }).skip(skip).limit(limit);
    });
};

class index {
    async index(ctx, next) {
        try {
            let sname = ctx.query.name;
            const data = await HuoGuan.find({ 'name': sname });
            //console.log(result);
            if (data.length<=0) {
                ctx.body={
                     message:'失败',
                     status:404
                 }
                 
             }else{
                 ctx.body={
                     message:'成功',
                     status:200,
                     data:data[0]
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
    // 用户登录
    // async index(ctx, next) {
    //     let  size = 10, page = 2 ;
    //     let options = {
    //       skip: Number((page - 1) * size),
    //       limit: Number(size)
    //     }
    //     let list = await Shiliao.find({}, null, options)
    //     let total = await Shiliao.countDocuments()
    //     let data = {
    //       list: list,
    //       pagination: {
    //         total,
    //         page,
    //         size
    //       }
    //     }
    //      if (list.length <= 0) {
    //         ctx.body = {
    //             message: '失败',
    //             status: 404,
    //         }

    //     } else {
    //         ctx.body = {
    //             message: '成功',
    //             status: 200,
    //             data: data
    //         }
    //     }

    //     // let sname = '食疗养生';
    //     // // const data = await Shiliao.find({ 'name': sname });
    //     // // Shiliao.find({name:sname}).then((result)=>{
    //     // //     console.log(result,'ppppppppppppppppp')
    //     // // })

    //     // if (data.length <= 0) {
    //     //     ctx.body = {
    //     //         message: '失败',
    //     //         status: false
    //     //     }

    //     // } else {
    //     //     ctx.body = {
    //     //         message: '成功',
    //     //         status: true,
    //     //         data: data[0]
    //     //     }
    //     // }
    // }
}

module.exports = new index();