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


mailSender.setMail = (toEmail,textEmail)=>{
    mailSender.mail = {
        from: "cafeappserver@gmail.com",
        to: toEmail,
        subject: "Littile cafeteria",
        html: textEmail
    };   
}

mailSender.sendEmail=(next)=>{
    
    mailSender.transporter.sendMail(mailSender.mail,next,(error, response)=>{
        if(error){
            return next(err);
        }
        mailSender.transporter.close();
    });
}



module.exports = mailSender;