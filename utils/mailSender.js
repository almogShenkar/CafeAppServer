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

mailSender.sendEmail=(next,callback)=>{
    
    mailSender.transporter.sendMail(mailSender.mail,next,(error, callback)=>{
        if(error){
            return next(err);
        }
        callback();
    });
}



module.exports = mailSender;