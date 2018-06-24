const log4js=require('log4js');
const logConfig= require('./logConfig');
const logger = log4js.getLogger('cafeappserver');
const loggerHeroku = require('heroku-logger');


function errHandler(){
    this.writeErr = (err,req,res,next)=>{
        loggerHeroku.error(err);
        logger.error(err);
        res.status(404);
        res.send("Oh uh, something went wrong");
    };
};

module.exports = errHandler;