const router = require('koa-router')();
const guaSha = require('./modlels/guaSha');
const huoGuan = require('./modlels/huoGuan');
const zhenCi = require('./modlels/zhenCi');
const aiJiu = require('./modlels/aiJiu');
// router.get('/',async (ctx)=>{
//     await ctx.render('doc/index');
// })
router.post('/guaSha', guaSha.index);

router.post('/aiJiu', aiJiu.index);

router.post('/zhenCi', zhenCi.index);

router.post('/huoGuan', huoGuan.index);

module.exports = router
