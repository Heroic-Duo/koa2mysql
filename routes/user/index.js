const router = require('koa-router')();
const forget = require('./modlels/forget');
const login = require('./modlels/login');
const register = require('./modlels/forget');
router.get('/',async (ctx)=>{
    ctx.body='1sssssssss'
})
// router.post('/forget', forget.index);

router.get('/forget/code', forget.code);
router.post('/forget/email', forget.email);
router.post('/forget/index', forget.index);

router.get('/login/code', login.code);
router.post('/login/index', login.index);


router.get('/register/code', register.code);
router.post('/register/email', register.email);
router.post('/register/index', register.index);


// router.post('/login', login.index);
// router.get('/login/code', login.code);



module.exports = router
