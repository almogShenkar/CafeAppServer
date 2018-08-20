const nodemailer = require("nodemailer");
const sgTransport = require('nodemailer-sendgrid-transport');

let mailSender = {};


// Use Smtp Protocol to send Email
mailSender.options={
    auth: {
        api_user: "almogassu@gmail.com",
        api_key: "KB241014@"
    }
};


mailSender.client = nodemailer.createTransport(sgTransport(mailSender.options));

mailSender.email = {
  from: 'awesome@bar.com',
  to: 'almogassu@gmail.com',
  subject: 'Hello',
  text: 'Hello world',
  html: '<b>Hello world</b>'
};

mailSender.client.sendMail(mailSender.email,(err,info)=>{
    if(err) {
        return err;
    }
    console.log('Message sent: ' + info.response);
});

mailSender.client.sendMail(mailSender.email,(err,info)=>{
    if(err)
        console.log(err);
});
module.exports = mailSender;