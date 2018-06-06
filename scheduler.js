var orderedlistsModel = require('./models/orderedlist-model');
var moment = require('moment');
var dblyLinkedList = require("dbly-linked-list");
var db = require('./db');

var scheduler = {};

scheduler.list;

scheduler.ctor = function () {
    scheduler.list = new dblyLinkedList();
    console.log(scheduler.list.isEmpty());
    scheduler.addOrder();
    console.log('Scheduler created and runing...');
}

scheduler.addOrder = function (orderedlistData,isBefore) {
    orderedlistData={};
    //2018-06-05T15:02:00.000Z
    orderedlistData.ol_dttm="2018-06-06T15:02:00.000Z";
    orderedlistData.totalpreptime = 6;
    orderedlistData.olid = 8888;
    orderedlistData.status = "none";
    isBefore= isBefore||false;
    db.query("SELECT * FROM todayfutureorders",function(err,rows){
        if(err){
            console.log(err);
            return;
        }
        scheduler.populateLinkedList(rows);
        var i=scheduler.findValidSlot(orderedlistData);
        console.log("findValidSlot:"+i);
        return scheduler.tryToAdd(orderedlistData,i,isBefore);
    });    
}

scheduler.clearNonUseSlots = function () {

}

scheduler.findValidSlot= function(orderedlistData){
    var it=scheduler.list.getHeadNode();
    if(it==null){
        scheduler.list.insert(orderedlistData);
        return;
    }
    while(it.hasNext()){
        console.log("orderedlistData.ol_dttm:"+ moment(orderedlistData.ol_dttm).utc().format());
        console.log("it:"+ moment(it.data.ol_dttm).utc().format());
        //console.log("XXXX: "+moment(it.data.ol_dttm).diff(orderedlistData.ol_dttm,"minute"));
        if(moment(it.data.ol_dttm)<moment(orderedlistData.ol_dttm)){
            it=it.next;
        }
        else{
            return scheduler.list.indexOf(it.data);
        }
    }
    return false;
    
}

scheduler.tryToAdd = function(orderedlistData,i,isBefore){
    var isFound=false;
    var it=null;
    isBefore=true;
    if(isBefore){
        it=scheduler.list.findAt(i);
        while(it.hasPrev() && !isFound){
            var secondNode = it.prev.data;
            var currentNode = it.data;
            isFound=scheduler.isValidSlot(orderedlistData,currentNode,secondNode);
            it=it.prev;
        }
    }
    else{
        it=scheduler.list.findAt(i);
        while(it.hasNext() && !isFound){
            var secondNode = it.next.data;
            var currentNode = it.data;
            isFound=scheduler.isValidSlot(orderedlistData,currentNode,secondNode);
            it=it.next;
        }
    }
    if(isFound){
        if(isBefore){
            it=it.next;
            //console.log("XXXX");
            scheduler.list.insertAt(scheduler.list.indexOf(it.data),orderedlistData);
        }
        else{
            it=it.prev;
            scheduler.list.insertAt(scheduler.list.indexOf(it.data),orderedlistData);

        }
        
    }
    console.log("___________");
    scheduler.list.forEach(function(elem){console.log(elem.data);},false);
    return false;
}

scheduler.isValidSlot = function (orderedlistData,currentNode,secondNode){
    currentNode.endTime=moment(currentNode.ol_dttm).add(currentNode.totalpreptime,'minutes');
    secondNode.endTime=moment(secondNode.ol_dttm).add(secondNode.totalpreptime,'minutes');
    orderedlistData.endTime=moment(orderedlistData.ol_dttm).add(orderedlistData.totalpreptime,'minutes');
    //var res=currentNodeTime.diff(secondNodeTime,'minutes')-currentNode.totalpreptime-orderedlistData.totalpreptime;
    //console.log("resCurrent.endTime:"+currentNode.endTime.utc().format());
    //console.log("resSecind.endTime:"+secondNode.endTime.utc().format());
    //console.log("orderedlistData.endTime:"+orderedlistData.endTime.utc().format());
    //console.log("current node index:"+scheduler.list.indexOf(currentNode));
    if(currentNode.endTime.diff(secondNode.endTime,'minutes')>=orderedlistData.totalpreptime && orderedlistData.endTime.isBefore(moment(currentNode.ol_dttm)))
    {
        delete orderedlistData.endTime;
        delete currentNode.endTime;
        delete secondNode.endTime;
        console.log("good insert");
        return true;;
    }
    console.log("bad insert");
    return false;
}


scheduler.populateLinkedList = function(rows){
    rows.forEach(element => {
        scheduler.list.insert(JSON.parse(JSON.stringify(element)));
        console.log("MOM "+moment(element.ol_dttm).utc().format());
    });

}
module.exports = scheduler;;

