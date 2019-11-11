
const Koa=require('koa'),
    router = require('koa-router')(),
    path=require('path'),
    render = require('koa-art-template'),
   
    session = require('koa-session'),
    jsonp = require('koa-jsonp'),
    bodyParser = require('koa-bodyparser'),
     static = require('koa-static'),
    logger = require('koa-logger'),
     koaBody = require('koa-body'),
    cors = require('koa2-cors'),
    historyApiFallback = require('koa2-connect-history-api-fallback'),
    jwt = require('jsonwebtoken'),
    jwtKoa = require('koa-jwt');

const routers = require('./routes/index');
require('./db/mongo');
let app=new Koa();

//配置jsonp的中间件
app.use(jsonp());
// middlewares
// app.use(bodyparser({
//   enableTypes:['json', 'form', 'text']
// }))

app.use(jwtKoa({secret: 'secret' }).unless({
  path: [
      /^((?!\/api\/luntan\/user).)*$/   // 设置除了私有接口外的其它资源，可以不需要认证访问
  ]
}
))
app.use((ctx, next) => {
  return next().catch((err) => {
      if (err.status === 401) {
          ctx.status = 401;
          ctx.body = {
              ok: false,
              msg: err.originalError ? err.originalError.message : err.message
          }
      } else {
          throw err;
      }
  });
});
// app.use(koaBody());
app.use(koaBody({
  // 支持文件格式
  multipart: true,
  formidable: {
      // 上传目录
      uploadDir: path.join(__dirname, 'public/uploads'),
      // 保留文件扩展名
      keepExtensions: true,
      onFileBegin:(name,file) => { // 文件上传前的设置
        // console.log(`name: ${name}`);
        // console.log(file);
       
      },
  }
}));
//配置post提交数据的中间件
app.use(bodyParser());

app.keys = ['some secret hurr'];
const CONFIG = {
    key: 'koa:sess',
    maxAge: 864000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: true,   /*每次请求都重新设置session*/
    renew: false,
};
app.use(session(CONFIG, app));
// app.use(logger())
app.use(logger((str, args) => {
  // redirect koa logger to other output pipe
  // default is process.stdout(by console.log function)
}))


//配置刷新中间件 跳转白名单   首页指向 vue 打包   ，删除首页指向ivews文件夹
app.use(historyApiFallback({ whiteList: ['/piblic','/api','/admin','views'] }));

//配置模板引擎
render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production',
  dateFormat:dateFormat=function(value){
      return sd.format(value, 'YYYY-MM-DD HH:mm');
  } /*扩展模板里面的方法*/
});
app.use(cors());
//配置 静态资源的中间件
app.use(static(path.join(__dirname, 'public')));


// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(routers.routes()).use(routers.allowedMethods());
// app.use(router.routes());   /*启动路由*/
// app.use(router.allowedMethods());
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
