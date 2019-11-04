// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

// const login = new Schema({
//   // name: { type: String, required: true },
//   // id: String,
// });

// var user = new Schema({
//   email: {
//     type: String,
//     required: true
//   },
//   nickname: {
//     type: String,
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   created_time: {
//     type: Date,
//     // 注意：这里不要写 Date.now() 因为会即刻调用
//     // 这里直接给了一个方法：Date.now
//     // 当你去 new Model 的时候，如果你没有传递 create_time ，则 mongoose 就会调用 default 指定的Date.now 方法，使用其返回值作为默认值
//     default: Date.now
//   },
//   last_modified_time: {
//     type: Date,
//     default: new Date()
//     // default: () => moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
//   },
//   avatar: {
//     type: String,
//     default: '/public/img/icon.jpg'
//   },
//   bio: {
//     type: String,
//     default: ''
//   },
//   sex: {
//     type: Number,
//     enum: [-1, 0, 1],
//     default: -1
//   },
//   age: {
//     type: Number,
//     enum: [0,1],
//     default: 0
//   },
//   district:{
//     type: Number,
//     enum: [ 0, 1,2,3],
//     default: 0
//   },
//   birthday: {
//     type: Date
//   },
//   expe: {
//     type: Number,
//     enum: [ 0, 1],
//     default: 0
//   },
//   reput: {
//     type: Number,
//     enum: [ 0, 1],
//     default: 0
//   },
//   rank: {
//     type: Number,
//     // 0 等级一
//     // 1 不可以登录
//     // 2 没有权限限制
//     // 3 管理员
//     // 4 超级管理员
//     // 5 不可以登录
//     enum: [0, 1, 2,3,4,5],
//     default: 0
//   },
//   status: {
//     type: Number,
//     // 0 不可以评论
//     // 1 不可以登录
//     // 2 没有权限限制
//     // 3 管理员
//     // 4 超级管理员
//     // 5 不可以登录
//     enum: [0, 1, 2,3,4,5],
//     default: 0
//   }
// })
// const User = mongoose.model('User',user);

// module.exports = {
//   User
// }
