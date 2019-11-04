
const router = require('koa-router')();
const api = require('./api/index.js');
const admin = require('./admin/index.js');
const user = require('./user/index.js');

router.use('/api', api.routes(), api.allowedMethods());

router.use('/admin', admin.routes(), admin.allowedMethods());

router.use('/user', user.routes(), user.allowedMethods());

module.exports = router