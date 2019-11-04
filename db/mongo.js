const mongoose = require('mongoose');

mongoose.Promise = Promise;

mongoose.connect('mongodb://34.87.95.255:27017/koa', {
  // useMongoClient: true,
  promiseLibrary: global.Promise
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.log(`数据库创建失败：${error}`);
});

db.on('open', () => {
  console.log('数据库连接成功');
});
module.exports = mongoose;