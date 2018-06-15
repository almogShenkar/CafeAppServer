var orderedlistsModel = require('../models/orderedlist');
var moment = require('moment');
var dblyLinkedList = require('dbly-linked-list');
var db = require('../db');

var scheduler = {};

scheduler.list;
scheduler.closeHour = 19;
scheduler.openHour = 07;
scheduler.minTimeOut = 120;

scheduler.ctor = function () {
    //console.log("isempty: "+scheduler.list.isEmpty());
    //scheduler.addOrder();
    console.log('Scheduler created and runing...');
}


scheduler.clearNonUseSlots = function (orderedlistData) {
    db.query("DELETE FROM orderlist WHERE olid=? AND status='None' ",orderedlistData.olid, function (err, rows) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Deleted " + rows.affectedRows + " Successfully");
        }

    });
}

scheduler.addOrder = function (orderedlistData, callback) {
    //orderedlistData = {};
    //2018-06-05T15:02:00.000Z
    //orderedlistData.ol_dttm = "2018-06-07T13:30:00.000Z";
    //orderedlistData.totalpreptime = 10;
    //orderedlistData.olid = 8888;
    orderedlistData.status = "none";
    orderedlistData.hasreview = 0;
    scheduler.list = new dblyLinkedList();
    db.query("SELECT * FROM todayfutureorders", function (err, rows) {
        if (err) {
            console.log(err);
            return;
        }
        scheduler.populateLinkedList(rows);
        console.log(scheduler.list.getSize());
        //var i = scheduler.findValidSlot(orderedlistData);
        //console.log("findValidSlot:" + i);
        while (scheduler.addToList(orderedlistData) == false) {
            orderedlistData.ol_dttm = moment(orderedlistData.ol_dttm).add(5, 'minutes').toISOString();
        }
        //scheduler.list.forEach(function(elem){console.log(elem.data);},false);
        scheduler.syncListToDB(orderedlistData, callback);
        setTimeout(function(){scheduler.clearNonUseSlots(orderedlistData);}, scheduler.minTimeOut * 1000);
    });
}


scheduler.populateLinkedList = function (rows) {
    rows.forEach(element => {
        scheduler.list.insert(JSON.parse(JSON.stringify(element)));
        //console.log("MOM " + moment.utc(element.ol_dttm).format());;
    });
}


scheduler.addToList = function (orderedlistData) {
    var isFound = false;
    var head = scheduler.list.getHeadNode();
    var it = head;
    var tail = scheduler.list.getTailNode();
    //console.log(`it head : ${it==head}`);
    if (it == null) {
        console.log("head null-inserted as head");
        scheduler.clearRedurantDataFromNodes(orderedlistData,it);                    
        scheduler.list.insert(orderedlistData);
        return true;
    }
    else {
        head.endTime = moment(head.data.ol_dttm).add(head.data.totalpreptime, 'minutes');
        tail.endTime = moment(head.data.ol_dttm).add(tail.data.totalpreptime, 'minutes');
        orderedlistData.endTime = moment(orderedlistData.ol_dttm).add(orderedlistData.totalpreptime, 'minutes');
    }
    while (it != null) {
        //try insert to head
        it.data.endTime = moment(it.data.ol_dttm).add(it.data.totalpreptime, 'minutes');
        if (it == head) {
            //unsert before had
            if (moment(orderedlistData.ol_dttm).isBefore(moment(it.data.ol_dttm)) && it.data.endTime.diff(orderedlistData.endTime, 'minutes') > orderedlistData.totalpreptime) {
                console.log("inserted before head");
                scheduler.clearRedurantDataFromNodes(orderedlistData,it);
                scheduler.list.insertFirst(orderedlistData);
                return true;
            }
            //insert after had
            else {
                var isValidAfterHead = false;
                //if there is element after head
                if (it.hasNext()) {
                    var nextToit = it.next;
                    nextToit.data.endTime = moment(nextToit.data.ol_dttm).add(nextToit.data.totalpreptime, 'minutes');
                    if (moment(it.data.ol_dttm).isBefore(moment(orderedlistData.ol_dttm)) &&
                        nextToit.data.endTime.diff(it.data.endTime, 'minutes') > orderedlistData.totalpreptime &&
                        moment(nextToit.data.ol_dttm).isAfter(orderedlistData.ol_dttm)
                    ) {
                        console.log("head+1");
                        isValidAfterHead = true;
                    }
                }
                //if ther head is the only one
                else {
                    if (moment(it.data.ol_dttm).isBefore(moment(orderedlistData.ol_dttm)) &&
                        orderedlistData.endTime.diff(it.data.endTime, 'minutes') > it.data.totalpreptime
                    ) {
                        console.log(moment(it.data.ol_dttm).isBefore(moment(orderedlistData.ol_dttm)));
                        console.log("only one");
                        isValidAfterHead = true;
                    }
                }
                if(isValidAfterHead){
                    console.log("inserted after head");
                    scheduler.clearRedurantDataFromNodes(orderedlistData,it);
                    scheduler.list.insert(orderedlistData);
                    return true;
                }
            }
        }
        //try insert to tail
        else if (it == tail) {
            if (moment(it.data.ol_dttm).isBefore(moment(orderedlistData.ol_dttm)) && orderedlistData.endTime.diff(it.data.endTime, 'minutes') > orderedlistData.totalpreptime) {
                console.log("inserted after tail");
                scheduler.clearRedurantDataFromNodes(orderedlistData,it);
                scheduler.list.insert(orderedlistData);
                return true;
            }
        }
        else if (it != head && it != tail) {
            //try insert somewhere at the middle
            //if list has only one element - check alg
            var nextToit = it.next;
            nextToit.data.endTime = moment(nextToit.data.ol_dttm).add(nextToit.data.totalpreptime, 'minutes');
            if (moment(orderedlistData.ol_dttm).isBefore(moment(nextToit.data.ol_dttm)) &&
                moment(orderedlistData.ol_dttm).isAfter(moment(it.data.ol_dttm)) &&
                orderedlistData.endTime.diff(it.data.endTime, 'minutes') > orderedlistData.totalpreptime &&
                nextToit.data.endTime.diff(orderedlistData.endTime, 'minutes') > orderedlistData.totalpreptime) {
                console.log("inserterd after body: " + scheduler.list.indexOf(it.data));
                scheduler.clearRedurantDataFromNodes(orderedlistData,it);
                scheduler.list.insertAfter(it.data, orderedlistData);
                return true;
            }
        }
        it = it.next;
    }
    //scheduler.list.forEach(function(elem){console.log(elem.data);},false);
    return false;
}


scheduler.syncListToDB = function (orderedlistData, callback) {
    var newNode = scheduler.list.find(orderedlistData);
    console.log(scheduler.list.getSize());
    if (newNode != -1) {
        db.query("INSERT INTO orderlist  VALUES(?,?,?,?,?,CURRENT_TIMESTAMP,?,?,?);", [null, orderedlistData.userid, orderedlistData.totalprice, orderedlistData.ol_dttm, orderedlistData.ol_dttm_real, orderedlistsModel.status, orderedlistData.hasreview, orderedlistData.totalpreptime],
            function (err, rows) {
                if (err) {
                    console.log(err);
                    return err;
                }
                orderedlistData.olid = rows.insertId;
                console.log("sync finish: " + rows.insertId);
                return callback({ olid: orderedlistData.olid, ol_dttm: orderedlistData.ol_dttm });
            });
    }
    else {
        return callback({ olid: -1 });
    }
}


scheduler.clearRedurantDataFromNodes = function(orderedlistData,it){
    try{
        delete orderedlistData.endTime;
        delete it.data.endTime;
        delete it.next.data.endTime;
        delete it.prev.data.endTime;
    }
    catch (err){
        console.log("Cleared redurand data caused a predicted exception")
    }

}

module.exports = scheduler;;
