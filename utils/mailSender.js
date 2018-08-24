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


mailSender.email={
    from:'cafeappserver@gmail.com',
    to:"",
    subject:'Little-Cafe invitaion',
    html:""
};


mailSender.setMail=(to,body)=>{
    //console.log('Here');
    mailSender.email.to=to;
    mailSender.email.html=body;
    mailSender.email.text=body;
};



mailSender.sendEmail=(next,callback)=>{
    //console.log(mailSender.email);
    mailSender.client.sendMail(mailSender.email,callback);  
};

/*
mailSender.client.sendMail=(mailSender.email,(err,info)=>{
    if(err) {
        return err;
    }
    console.log('Message sent: ' + info.response);
});
*/



module.exports = mailSender;