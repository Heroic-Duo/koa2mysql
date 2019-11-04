const router = require('koa-router')();
const shiliao = require('./modlels/shiliao');
// router.get('/',async (ctx)=>{
//     await ctx.render('doc/index');
// })
router.post('/shiliao', shiliao.index);
 
module.exports = router
