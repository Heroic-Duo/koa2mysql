const router = require('koa-router')();
const daojia = require('./modlels/daojia');
const rujia = require('./modlels/rujia');
// router.get('/',async (ctx)=>{
//     await ctx.render('doc/index');
// })
router.post('/daojia', daojia.index);

router.post('/rujia', rujia.index);

module.exports = router
