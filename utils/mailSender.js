const mailer = require("nodemailer");

let mailSender = {};


// Use Smtp Protocol to send Email
mailSender.transporter = mailer.createTransport({
    service: "Gmail",
    auth: {
        user: "cafeappserver@gmail.com",
        pass: "lbj666666"
    }
});



mailSender.sendEmail=(toEmail,textEmail,next)=>{
    let mail = {
        from: "cafeappserver@gmail.com",
        to: toEmail,
        subject: "Littile cafeteria",
        html: textEmail
    };
    mailSender.transporter.sendMail(mail,next,(error, response)=>{
        if(error){
            next(err);
        }
        mailSender.transporter.close();
    });
}



module.exports = mailSender;