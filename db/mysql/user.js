

//import { create } from 'domain';

const mysql = require('mysql');
const {configUser} = require('./../../models/config/default')
//建立数据库连接池
const pool = mysql.createPool({
    host: configUser.database.HOST,
    user: configUser.database.USERNAME,
    password: configUser.database.PASSWORD,
    database: configUser.database.DATABASE
});

let query = function(sql, values) {
    return new Promise((resolve, reject)=>{
        pool.getConnection(function (err,connection) {
            if(err){
                reject(err);
            }else{
                connection.query(sql,values,(err,rows)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(rows);
                    }
                    connection.release(); //为每一个请求都建立一个connection使用完后调用connection.release(); 直接释放资源。
                                          //query用来操作数据库表
                })
            }
         console.log('user mysql')
    })
    })
}

var users = `create table if not exists users(
    id INT(200) NOT NULL AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(40) NOT NULL,
    nickname VARCHAR(40) NOT NULL,
    avator VARCHAR(100) DEFAULT 'default.jpg',
    created_time VARCHAR(40) NOT NULL,
    last_modified_time VARCHAR(40),
    bio VARCHAR(40),
    sex INT(200) ,
    age INT(200) ,
    experience INT(200) ,
    prestige INT(200) ,
    prestigeRank INT(200) ,
    experienceRank INT(200) ,
    status INT(200) ,
    follow INT(200) NOT NULL DEFAULT '0',
    PRIMARY KEY (id)
);`
// let users = `create table if not exists users(
//     id INT(200) NOT NULL AUTO_INCREMENT,
//     email VARCHAR(100) NOT NULL,
//     password VARCHAR(40) NOT NULL,
//     nickname VARCHAR(40) NOT NULL,
//     avator VARCHAR(100) DEFAULT 'default.jpg',
//     created_time VARCHAR(40) NOT NULL,
//     last_modified_time VARCHAR(40) NOT NULL,
//     bio VARCHAR(40) NOT NULL,
//     sex INT(200)  DEFAULT 0,
//     age INT(200)  DEFAULT 0,
//     experience INT(200)  DEFAULT 0,
//     prestige INT(200)  DEFAULT 0,
//     prestigeRank INT(200)  DEFAULT 0,
//     experienceRank INT(200)  DEFAULT 0,
//     status INT(200)  DEFAULT 0,
//     follow INT(200) NOT NULL DEFAULT '0',
//     company VARCHAR(40),
//     introdu VARCHAR(255),
//     userhome VARCHAR(100),
//     github VARCHAR(100),
//     lastactivity TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
//     PRIMARY KEY (id) ,
//     FOREIGN KEY (uid) REFERENCES users(id)
// );`


let createTable = function(sql){
    return query(sql, []);
}

//建表
createTable(users);

//createTable(follower);
//注册用户
let insertData = function(value){
    let _sql = "insert into users(email,password,created_time) values(?,?,?);"
    return query(_sql,value);
}
//更新头像
let updateUserImg = function(value){
    let _sql = "update users set avator=? where id=?"
    return query(_sql,value);
}
let updatePass = function(value){
    let _sql = "update users set password=? where email=?"
    return query(_sql,value);
}
//更新用户信息
let updateUser = function(value){
    let _sql = "update users set email=?,password=?,job=?,company=?,introdu=?,userhome=?,github=? where id=?"
    return query(_sql,value);
}



//通过名字查找用户
let findDataByName = function(name){
    let _sql = `SELECT * from users where name="${name}"`
    return query(_sql);
}

//暴露所有函数接口
module.exports = {
    query,
    users,
    createTable,
    insertData,
    updatePass,
    updateUserImg,
    updateUser,
    findDataByName,

}
