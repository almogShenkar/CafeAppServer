/**
 * MailSender module- responsible for sending emails
 */

const nodemailer = require("nodemailer");
const sgTransport = require('nodemailer-sendgrid-transport');

let mailSender={};


//configuration
mailSender.options={
    auth: {
        api_user: "almogassu@gmail.com",
        api_key: "KB241014@"
    }
};


let client = nodemailer.createTransport(sgTransport(mailSender.options));



mailSender.email={
    from:'cafeappserver@gmail.com',
    to:"",
    subject:'Little-Cafe invitaion',
    html:""
};

/**
 * setMail - set the mail before sending
 * input: to - mail address ,  body - message content
 * output: none
 */
mailSender.setMail=(to,body)=>{
    //console.log('Here');
    mailSender.email.to=to;
    mailSender.email.html=body;
    mailSender.email.text=body;
};


/**
 * sendEmail - send the email
 * input: callback - what to do onDone
 * output: none
 */
mailSender.sendEmail=(callback)=>{
    //console.log(mailSender.email);
    client.sendMail(mailSender.email,callback);
};





module.exports = mailSender;