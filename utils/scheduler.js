/**
 * Scheduler module - manage all incoming orders
 */

const orderlistBluePrint = require('../models/dataObject');
const moment = require('moment');
const dblyLinkedList = require('dbly-linked-list');
const db = require('../db');

let scheduler = {};

scheduler.list;
scheduler.closeHour = 19;
scheduler.openHour = 07;
scheduler.minTimeOut = 120;
scheduler.deltaFactor;

/**
 * clearNonUseSlots - Delete empty slot that saved and the user didn't complete the order 
 * input: orderedlistData
 * output: none
 */
scheduler.clearNonUseSlots =(orderedlistData)=>{
    db.query("DELETE FROM orderlist WHERE olid=? AND status='None' ",orderedlistData.olid,(err, rows)=>{
        if (err) {
            console.log(err);
        }
        else {
            console.log("Deleted " + rows.affectedRows + " Successfully");
        }
    });
}


/**
 * addOrder - try to add new order to the database
 * input: orderedlistData , next callback
 * output: the time avilable of the new orderedlist
 */
scheduler.addOrder = (orderedlistData, next, callback)=>{
    //orderedlistData = {};
    //2018-06-05T15:02:00.000Z
    //orderedlistData.ol_dttm = "2018-06-07T13:30:00.000Z";
    //orderedlistData.totalpreptime = 10;
    //orderedlistData.olid = 8888;
    orderedlistData.status = "None";
    orderedlistData.hasreview = 0;
    scheduler.list = new dblyLinkedList();
    db.query("SELECT * FROM todayfutureorders",(err, rows)=>{
        if (err) {
            return next(err);
        }
        scheduler.populateLinkedList(rows);
        
        while (scheduler.addToList(orderedlistData) == false) {
            orderedlistData.ol_dttm = moment(orderedlistData.ol_dttm).add(1, 'minutes').toISOString();
        }
        //scheduler.list.forEach(function(elem){console.log(elem.data);},false);
        scheduler.syncListToDB(orderedlistData,next,callback);
        setTimeout(()=>{scheduler.clearNonUseSlots(orderedlistData);}, scheduler.minTimeOut * 1000);
    });
}


/**
 * populateLinkedList - populate the linked list with the orders from the database
 * input: rows
 * output: none
 */
scheduler.populateLinkedList =(rows)=>{
    rows.forEach(element => {
        scheduler.list.insert(JSON.parse(JSON.stringify(element)));
        //console.log("MOM " + moment.utc(element.ol_dttm).format());;
    });
}

/**
 * addToList - iterating the list and trying to add a new node that matches the logic
 * input: orderedlistData
 * output: true / false
 */
scheduler.addToList = (orderedlistData)=>{
    let head = scheduler.list.getHeadNode();
    let it = head;
    let tail = scheduler.list.getTailNode();
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
        if (it == head && scheduler.list.getSize()==1) {
            //insert before had
            if (moment(orderedlistData.ol_dttm).isBefore(moment(it.data.ol_dttm)) && it.data.endTime.diff(orderedlistData.endTime, 'minutes') >= orderedlistData.totalpreptime) {
                console.log("inserted before head");
                scheduler.clearRedurantDataFromNodes(orderedlistData,it);
                scheduler.list.insertFirst(orderedlistData);
                return true;
            }
            //insert after had
            else {
                let isValidAfterHead = false;
                //if there is element after head
                if (it.hasNext()) {
                    let nextToit = it.next;
                    nextToit.data.endTime = moment(nextToit.data.ol_dttm).add(nextToit.data.totalpreptime, 'minutes');
                    if (moment(it.data.ol_dttm).isBefore(moment(orderedlistData.ol_dttm)) &&
                        nextToit.data.endTime.diff(it.data.endTime, 'minutes') >= orderedlistData.totalpreptime &&
                        moment(nextToit.data.ol_dttm).isAfter(orderedlistData.ol_dttm)) {
                        console.log("head+1");
                        isValidAfterHead = true;
                    }
                }
                //if ther head is the only one
                else {
                    if (moment(it.data.ol_dttm).isBefore(moment(orderedlistData.ol_dttm)) &&
                        orderedlistData.endTime.diff(it.data.endTime, 'minutes') >= it.data.totalpreptime
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
            if (moment(it.data.ol_dttm).isBefore(moment(orderedlistData.ol_dttm)) && orderedlistData.endTime.diff(it.data.endTime, 'minutes') >= orderedlistData.totalpreptime) {
                console.log("inserted after tail");
                scheduler.clearRedurantDataFromNodes(orderedlistData,it);
                scheduler.list.insert(orderedlistData);
                return true;
            }
        }
        else if (it != head && it != tail) {
            //try insert somewhere at the middle
            //if list has only one element - check alg
            let nextToit = it.next;
            nextToit.data.endTime = moment(nextToit.data.ol_dttm).add(nextToit.data.totalpreptime, 'minutes');
            if (moment(orderedlistData.ol_dttm).isBefore(moment(nextToit.data.ol_dttm)) &&
                moment(orderedlistData.ol_dttm).isAfter(moment(it.data.ol_dttm)) &&
                orderedlistData.endTime.diff(it.data.endTime, 'minutes') >= orderedlistData.totalpreptime &&
                nextToit.data.endTime.diff(orderedlistData.endTime, 'minutes') >= orderedlistData.totalpreptime) {
                console.log("inserterd after body: " + scheduler.list.indexOf(it.data));
                scheduler.clearRedurantDataFromNodes(orderedlistData,it);
                scheduler.list.insertAfter(it.data, orderedlistData);
                return true;
            }
        }
        //Todo Almog - deltafactor
        //scheduler.deltaFactor=Math.min(scheduler.deltaFactor,it.data.totalpreptime);
        it = it.next;
    }
    //scheduler.list.forEach(function(elem){console.log(elem.data);},false);
    return false;
}

/**
 * syncListToDB - inserting the new order to the database after appropriate node was found
 * input: orderedlistData ,next ,callback
 * output: result: -1 failed or time of the new order
 */
scheduler.syncListToDB = function (orderlistData,next,callback) {
    let newNode = scheduler.list.find(orderlistData);
    console.log(scheduler.list.getSize());
    if (newNode != -1) {
        db.query("INSERT INTO orderlist  VALUES(?,?,?,?,?,CURRENT_TIMESTAMP,?,?,?);", [null, orderlistData.userid, orderlistData.totalprice, orderlistData.ol_dttm, orderlistData.ol_dttm_real, orderlistData.status, orderlistData.hasreview, orderlistData.totalpreptime],
            (err, rows)=>{
                if (err) {
                    return next(err);
                }
                orderlistData.olid = rows.insertId;
                console.log("sync finish: " + rows.insertId);
                return callback({ olid: orderlistData.olid, ol_dttm: orderlistData.ol_dttm });
            });
    }
    else {
        return callback({ olid: -1 });
    }
}


/**
 * clearRedurantDataFromNodes - util function- delete unnecessary objects - better perfomance
 * input: orderedlistData - new orderlist object , it - node from linked list
 * output: none
 */
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
