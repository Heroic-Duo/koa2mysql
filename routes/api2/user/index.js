const router = require('koa-router')();
// const forget = require('./modlels/forget');
// const login = require('./modlels/login');
const register = require('./modlels/register');
router.get('/',async (ctx)=>{
    ctx.body='1111111111'
})
// router.post('/forget', forget.index);



router.post('/register', register.index);
router.get('/register/code', register.code);


// router.post('/login', login.index);
// router.get('/login/code', login.code);



module.exports = router
