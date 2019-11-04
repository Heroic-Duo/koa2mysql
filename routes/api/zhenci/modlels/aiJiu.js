

const { AiJiu } = require('./db.js');

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
            const data = await AiJiu.find({ 'name': sname });
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
}

module.exports = new index();