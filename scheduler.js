var LinkedList = require('singly-linked-list');
var orderedlistsModel = require('./models/orderedlist-model');
var db = require('./db');
//none incoming active completed
var scheduler = {};

scheduler.listToBeMade;
scheduler.listSavedSlot=[];
 
scheduler.ctor = function(){
    
    //scheduler.list = new LinkedList();
    console.log('Scheduler created and runing...');
    
}

scheduler.addOrder = function(oldttm,totalpreptime,beforeOrAfter,callback){
    //to do
    //get the today view
    //find the right place of the time - mean that find the first bigger and start trying to insert from this point - before or after
    // deltaTime of 1 hour
    
    //db.query("SELECT * FROM todayfutureorders",(err,rows)=>{
    db.query("SELECT * FROM orderlist order by ol_dttm desc limit 1",(err,rows)=>{
        if(err){
            
            console.log(err);
            return;
        }
        //console.log("addorder finish: "+rows);
        callback(rows);
    });
}

scheduler.clearSlots = function(){
        db.query("DELETE FROM orderlist WHERE status = 'None' ",function(err,rows){
            if(err){
                console.log(err);
                return;
            }
            console.log("Deleted "+rows.affectedRows+" successfully");
    });
   
}
module.exports = scheduler;
