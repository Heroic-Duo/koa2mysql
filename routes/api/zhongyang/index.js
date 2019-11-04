const router = require('koa-router')();
const hdnj = require('./modlels/hdnj');
const rujia = require('./modlels/rujia');
// router.get('/',async (ctx)=>{
//     await ctx.render('doc/index');
// })
router.post('/daojia', hdnj.index);

// router.post('/rujia', rujia.index);

module.exports = router
