var LinkedList = require('singly-linked-list');
var orderedlistsModel = require('./models/orderedlist-model');
var scheduler = {};

scheduler.list;
 
scheduler.ctor = function(){
    
    scheduler.list = new LinkedList();
    console.log('Scheduler created and runing...');
    
}

scheduler.addOrder = function(req,res){
    orderedlistsModel.parse(req.body);
    var timeToMake = orderedlistsModel.calcOrderListFromOrderdItems();
    if (scheduler.list.isEmpty()){
        list.insert();
    }
}
module.exports = scheduler;
