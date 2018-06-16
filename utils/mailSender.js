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
        subject: "Invitaion to littile cafeteria",
        text: textEmail,
        html: "<b></b>"
    };
    console.log(mail);
    mailSender.transporter.sendMail(mail, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }
        mailSender.transporter.close();
    });
}



module.exports = mailSender;