const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: "d5dc5fc7",
  apiSecret: "JeB8x972YSmOLxN8"
});

var smsSender={};
smsSender.sendSms = function(to,text){
    nexmo.message.sendSms(
        "0544222722", "972"+to.substr(1), text,
          (err, responseData) => {
            if (err) {
              console.log(err);
            } else {
              //console.dir(responseData);
            }
          }
       );
}


module.exports=smsSender;