var mailer = require("nodemailer");

var mailSender = {};


// Use Smtp Protocol to send Email
mailSender.transporter = mailer.createTransport({
    service: "Gmail",
    auth: {
        user: "cafeappserver@gmail.com",
        pass: "lbj666666"
    }
});



mailSender.sendEmail=function(toEmail,textEmail){
    var mail = {
        from: "cafeappserver@gmail.com",
        to: toEmail,
        subject: "Littile cafeteria",
        html: textEmail
    };
    console.log(mail);
    mailSender.transporter.sendMail(mail, function(error, response){
        if(error){
            console.log(error);
        }
        mailSender.transporter.close();
    });
}



module.exports = mailSender;