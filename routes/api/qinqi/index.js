const router = require('koa-router')();
const qin = require('./modlels/qin');
const qi = require('./modlels/qi');
const shu = require('./modlels/shu');
const hua = require('./modlels/hua');
// router.get('/',async (ctx)=>{
//     await ctx.render('doc/index');
// })
router.post('/qin', qin.index);

router.post('/qi', qi.index);

router.post('/shu', shu.index);

router.post('/hua', hua.index);

module.exports = router
