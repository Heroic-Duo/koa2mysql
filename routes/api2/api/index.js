
/**
 * 整合所有子路由
 */

const router = require('koa-router')();
const  shiwu = require('./shiwu/index.js');
const xuejia = require('./xuejia/index.js');

router.get('/', async (ctx, next) => {
  ctx.body = 'koa2 1111111'
})
router.use('/shiwu',  shiwu.routes(),  shiwu.allowedMethods());

router.use('/xuejia', xuejia.routes(), xuejia.allowedMethods());

module.exports=router;
