const nodemailer = require('nodemailer');  

function sendEmail(mailOptions){
    //var stmpTransport = nodemailer.createTransport("SMTP",{
    var stmpTransport = nodemailer.createTransport({
    // host:"smtp.163.com",//主机 qq邮箱，可修改
    host:"smtp.qq.com",//主机 qq邮箱，可修改
    // secureConnection: false,
    //secure: true,
    secureConnection:true,//使用SSL SMTP
    port:465,
    auth:{
      user:"lanmo7758521@qq.com", //你的邮箱帐号,
      pass:"etxwaclpbsajbhbc"//你的邮箱授权码   QQ etxwaclpbsajbhbc
    }
    // auth:{
    //   user:"ysccZw@163.com", //你的邮箱帐号,
    //   pass:"yscc2018"//你的邮箱授权码   QQ etxwaclpbsajbhbc
    // }
  });
  stmpTransport.sendMail(mailOptions,function(error,response){
    if(error){
      console.log('error',error);
      //收信方问题
    }else{
      // console.log("Message sent:"+response.message);
       console.log("Message sent:get");
    }
    stmpTransport.close();
  });
}
    
// function sendEmail1(key,email){
//     //var stmpTransport = nodemailer.createTransport("SMTP",{
//     var stmpTransport = nodemailer.createTransport({
//     host: 'smtp.sina.com',
//     host:"smtp.163.com",//主机 qq邮箱，可修改
//     // secureConnection: false,
//     secure: true,
//     //secureConnection:true,//使用SSL SMTP
//     port:465,
//     auth:{
//       user:"yscc_zw@163.com", //你的邮箱帐号,
//       pass:"yscc2018"//你的邮箱授权码   QQ etxwaclpbsajbhbc
//       user: 'yscc_zw@sina.com', // generated ethereal user
//       pass: 'lanmo521' // generated ethereal password
//     }
//   });
      
//   var mailOptions = {
//     from:"yscc_zw@163.com",//标题
//     to: email,//收件人
//     subject: "养生传承堂_庄王", // 标题
//     text: '修改验证码',
//     html: "<h1>您的邮箱修改密码验证为  <p>"+ key + "</p>    世界，如此美好！</h1>" // html 内容
//   };

//   stmpTransport.sendEmail(mailOptions,function(error,response){
//     if(error){
//       console.log('error',error);
//       //收信方问题
//     }else{
//       // console.log("Message sent:"+response.message);
//        console.log("Message sent:111"+response);
//     }
//     stmpTransport.close();
//   });
// }

module.exports=sendEmail;
