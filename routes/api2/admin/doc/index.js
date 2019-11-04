const router = require('koa-router')();
const doc = require('./modlels/index');

router.get('/', doc.index);
// router.get('/',async (ctx)=>{
//     await ctx.render('admin/docs/one');
// })
module.exports = router
