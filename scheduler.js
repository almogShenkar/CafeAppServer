var LinkedList = require('singly-linked-list');
var orderedlistsModel = require('./models/orderedlist-model');
var db = require('./db');
//none incoming active completed
var scheduler = {};

scheduler.listToBeMade;
scheduler.listSavedSlot=[];
 
scheduler.ctor = function(){
    
    scheduler.list = new LinkedList();
    console.log('Scheduler created and runing...');
    
}

scheduler.addOrder = function(req,res){
    orderedlistsModel.parse(req.body);
    var timeToMake = orderedlistsModel.calcOrderListFromOrderdItems();
    if (scheduler.listToBeMade.isEmpty()){
        scheduler.listToBeMade.insert();
        //Todo
        //scheduler.listSavedSlot[]=;
    }
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
