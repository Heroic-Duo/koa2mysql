const router = require('koa-router')();
const user = require('./modlels/user');
const xueJia = require('./modlels/xueJia');
const zhongYang = require('./modlels/zhongYang');
const shiWu = require('./modlels/shiWu');
const qqsh = require('./modlels/qqsh');
// const list = require('./modlels/list');
// router.get('/',async (ctx)=>{
//     await ctx.render('doc/index');
// })
router.post('/user/list/publish', user.listpublish);
router.post('/user/list/delete', user.listdelete);
router.post('/user/list/fans', user.listfans);
router.post('/user/comment/delete', user.commentdelete);
router.post('/user/comment/publish', user.commentpublish);



router.post('/xueJia/index', xueJia.index);
router.post('/xueJia/list', xueJia.list);
router.post('/xueJia/details', xueJia.details);

// router.post('/zhongYang/index', zhongYang.index);
// router.post('/zhongYang/list', zhongYang.list);
// router.post('/zhongYang/details', zhongYang.details);

// router.post('/shiWu/index', shiWu.index);
// router.post('/shiWu/list', shiWu.list);
// router.post('/shiWu/details', shiWu.details);

// router.post('/qqsh/index', qqsh.index);
// router.post('/qqsh/list', qqsh.list);
// router.post('/qqsh/details', qqsh.details);

// router.post('/list/index', list.index);
// router.post('/list/list', list.list);
// router.post('/list/details', list.details);

module.exports = router
