// const config = {
//     //启动端口
//     port: 8080,

//     //数据库配置
//     database: {
//         DATABASE: 'koa',
//         USERNAME: 'mysql',
//         PASSWORD: '123456',
//         PORT: '3306',
//         HOST: '192.168.116.128'
//     }
// }

const config = {
    //数据库配置  用户
    database: {
        DATABASE: 'koa',
        USERNAME: 'mysql',
        PASSWORD: '123456',
        PORT: '3306',
        HOST: '192.168.182.128'
    }
}

const luntan = {
    
    //数据库配置  论坛
    database: {
        DATABASE: 'luntan',
        USERNAME: 'mysql',
        PASSWORD: '123456',
        PORT: '3306',
        HOST: '192.168.182.128'
    }
}

const shu = {
  
    //数据库配置  琴棋书画
    database: {
        DATABASE: 'shu',
        USERNAME: 'mysql',
        PASSWORD: '123456',
        PORT: '3306',
        HOST: '192.168.116.128'
    }
}

module.exports = {config,luntan,shu}  