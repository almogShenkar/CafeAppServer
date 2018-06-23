const log4js=require('log4js');
const logConfig= require('./logConfig');
const logger = log4js.getLogger('cafeappserver');

function errHandler(){
    this.writeErr = (err,req,res,next)=>{
        logger.error(err);
        res.status(404);
        res.send("Oh uh, something went wrong");
    };
};

module.exports = errHandler;