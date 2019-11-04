const router = require('koa-router')();
const doc = require('./doc/index');

// router.prefix('/admin')

router.use('/docs', doc.routes(), doc.allowedMethods());

module.exports = router