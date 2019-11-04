
class index {
    // 用户登录
    async index(ctx, next) {
        await ctx.render('admin/docs/wo');
    }
    // 用户信息
    async userInfo(ctx, next) {
        // do something

        // 假设这是请求回来的数据
        let data = {
            name: 'jk',
            age: 25
        }
        ctx.body = {
            status: true,
            data
        };
    }
}

module.exports = new index();