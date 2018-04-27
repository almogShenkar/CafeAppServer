var mailer = require("nodemailer");

var mailSender = {};

mailSender.from;
mailSender.to;
mailSender.subject;
mailSender.text;


// Use Smtp Protocol to send Email
var smtpTransport = mailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "cafeappserver@gmail.com",
        pass: "lbj666666"
    }
});

/*
var mail = {
    from: "Yashwant Chavan <from@gmail.com>",
    to: "to@gmail.com",
    subject: "Send Email Using Node.js",
    text: "Node.js New world for me",
    html: "<b>Node.js New world for me</b>"
}
*/

smtpTransport.sendMail(mail, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }

    smtpTransport.close();
});

module.exports = mailSender;