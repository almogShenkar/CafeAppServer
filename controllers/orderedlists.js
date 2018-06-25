const db = require('../db');
const scheduler = require('../utils/scheduler');
const orderlistBluePrint = require('../models/dataObject');

let orderedlistController = {};


orderedlistController.list = (req,res,next)=>{
    db.query("SELECT * FROM orderlist ORDER BY ol_dttm DESC;",(err,rows)=>{
        if(err){
            return next(err);
        }
        return res.json(rows);
    });
}

orderedlistController.getByOlid = (req,res,next)=>{
    db.query("SELECT * FROM orderlist WHERE olid = ? ;",req.params.id,(err,rows)=>{
        if(err){
            return next(err);
        }
        return res.json(rows[0]);
    });
}


//GET ALL by userid
orderedlistController.listByUserid = (req,res,next)=>{
    db.query("SELECT * FROM orderlist WHERE userid = ? ORDER BY ol_dttm DESC;",req.params.id,(err,rows)=>{
        if(err){
            return next(err);
        }
        return res.json(rows);
    });
}

//GET TodayasOrders
orderedlistController.todayfutureorders =(req,res,next)=>{
    db.query("SELECT olid,ol_dttm,status,totalpreptime,totalprice,userid FROM ORDERLIST WHERE ((CURDATE() <= CAST(OL_DTTM AS DATE))) AND STATUS in ('Incoming','None') ORDER BY OL_DTTM;",(err,rows)=>{
        if(err){
            return next(err);
        }
        return res.json(rows);
    });
}


//GET ALL by status
orderedlistController.listByStatus = (req,res,next)=>{
    db.query("SELECT * FROM orderlist WHERE status = ? ORDER BY ol_dttm DESC;",req.params.status,(err,rows)=>{
        if(err){
            return next(err);
        }
        return res.json(rows);
    });
}

//GET todayactiveorders
orderedlistController.todayactiveorders =(req,res,next)=>{
    db.query("SELECT olid,ol_dttm,status,totalpreptime,totalprice,userid FROM ORDERLIST WHERE ((CURDATE() <= CAST(OL_DTTM AS DATE))) AND STATUS='ACTIVE' ORDER BY OL_DTTM;",req.params.status,(err,rows)=>{
        if(err){
            return next(err);
        }
        return res.json(rows);
    });
}


//PUT
orderedlistController.update = (req,res,next)=>{
    let orderlist = new orderlistBluePrint(req.body);
    let orderedlistData = orderlist.getData();
    db.query("UPDATE orderlist SET userid=?, totalprice=?, ol_dttm=?, status = ?, totalpreptime= ? , timestamp = ? , ol_dttm_real = ? , hasreview = ? WHERE olid = ? ;",[orderedlistData.userid,orderedlistData.totalprice,orderedlistData.ol_dttm,orderedlistData.status,orderedlistData.totalpreptime,orderedlistData.timestamp,orderedlistData.ol_dttm_real,orderedlistData.hasreview,orderedlistData.olid],
    (err,rows)=>{
        if(err){
            return next(err);
        }
        return res.json({changedRows:rows.changedRows});
    });
}

//POST
orderedlistController.add = (req,res,next)=>{
    let orderlist = new orderlistBluePrint(req.body);
    let orderedlistData = orderlist.getData();
    db.query("INSERT INTO orderlist  VALUES(?,?,?,?,?,CURRENT_TIMESTAMP,?,?,?);",[null,orderedlistData.userid,orderedlistData.totalprice,orderedlistData.ol_dttm,orderedlistData.ol_dttm_real,orderedlistData.status,orderedlistData.hasreview,orderedlistData.totalpreptime],
    (err,rows)=>{
        if(err){
            return next(err);
        }
        orderlist.data.olid=rows.insertId;
        return res.json({olid:orderlist.data.olid});
    });
}

orderedlistController.delete = (req,res,next)=>{
    db.query("DELETE FROM orderlist WHERE olid = ?;",[req.params.id],
    (err,rows)=>{
        if(err){
            return next(err);
        }
        return res.json({affectedRows:rows.affectedRows});
    });
}

orderedlistController.checkTime = (req,res,next)=>{
    let orderlist = new orderlistBluePrint(req.body);
    let orderedlistData = orderlist.getData();
    scheduler.addOrder(orderedlistData,next,(result)=>{orderedlistController.sendSchedulerResult(res,result);});
}

orderedlistController.sendSchedulerResult = (res,result)=>{
    res.status(404);
    res.json(result);
}
                 
module.exports = orderedlistController;