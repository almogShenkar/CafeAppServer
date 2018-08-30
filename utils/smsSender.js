/**
 * SmsSender module- responsible for sms messages
 */
const Nexmo = require('nexmo');

//configuration
const nexmo = new Nexmo({
  apiKey: "d5dc5fc7",
  apiSecret: "JeB8x972YSmOLxN8"
});

let smsSender={};


/**
 * sendSms - send sms to user phone
 * input: to - phone number ,  text - message content , next
 * output: none
 */
smsSender.sendSms = (to,text,next)=>{
    nexmo.message.sendSms(
        "0544222722", "972"+to.substr(1), text,
          (err, responseData) => {
            if (err) {
              next(err);
            } else {
              //console.dir(responseData);
            }
          }
       );
}


module.exports=smsSender;