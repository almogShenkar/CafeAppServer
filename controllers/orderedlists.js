var db = require('../db');
var scheduler = require('../utils/scheduler');
var orderedlistsModel = require('../models/orderedlist');
//var orderedlistsNode = require('../models/orderedlists-node');
//var itemModel = require('../models/item-model');
//main object
var orderedlistsController = {};


orderedlistsController.list = function(req,res){
    db.query("SELECT * FROM orderlist ORDER BY ol_dttm DESC;",function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        return res.json(rows);

    });
}

orderedlistsController.getByOlid = function(req,res){
    db.query("SELECT * FROM orderlist WHERE olid = ? ;",req.params.id,function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        return res.json(rows[0]);

    });
}


//GET ALL by userid
orderedlistsController.listByUserid = function(req,res){
    db.query("SELECT * FROM orderlist WHERE userid = ? ORDER BY ol_dttm DESC;",req.params.id,function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        return res.json(rows);

    });
}



//GET ALL by status
orderedlistsController.listByStatus = function(req,res){
    db.query("SELECT * FROM orderlist WHERE status = ? ORDER BY ol_dttm DESC;",req.params.status,function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        return res.json(rows);

    });
}

//PUT
orderedlistsController.update = function(req,res){
    orderedlistsModel.clear();
    orderedlistsModel.parse(req.body);
    db.query("UPDATE orderlist SET userid=?, totalprice=?, ol_dttm=?, status = ? , timestamp = ? , ol_dttm_real = ? , hasreview = ? WHERE olid = ? ;",[orderedlistsModel.userid,orderedlistsModel.totalprice,orderedlistsModel.ol_dttm,orderedlistsModel.status,orderedlistsModel.timestamp,orderedlistsModel.ol_dttm_real,orderedlistsModel.hasreview,orderedlistsModel.olid],
    function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        return res.json({changedRows:rows.changedRows});

    });
}

//POST
orderedlistsController.add = function(req,res){
    orderedlistsModel.clear();
    orderedlistsModel.parse(req.body);
    db.query("INSERT INTO orderlist  VALUES(?,?,?,?,?,CURRENT_TIMESTAMP,?,?,?);",[null,orderedlistsModel.userid,orderedlistsModel.totalprice,orderedlistsModel.ol_dttm,orderedlistsModel.ol_dttm_real,orderedlistsModel.status,orderedlistsModel.hasreview,orderedlistsModel.totalpreptime],
    function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        orderedlistsModel.clear();
        orderedlistsModel.olid=rows.insertId;
        return res.json({olid:orderedlistsModel.olid});
    });
}

orderedlistsController.delete = function(req,res){
    db.query("DELETE FROM orderlist WHERE olid = ?;",[req.params.id],
    function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        return res.json({affectedRows:rows.affectedRows});

    });
}

orderedlistsController.checkTime = function(req,res){
    orderedlistsModel.clear();
    orderedlistsModel.parse(req.body);
    scheduler.addOrder(orderedlistsModel,function(result) {orderedlistsController.sendSchedulerResult(res,result);});
}

orderedlistsController.sendSchedulerResult = function(res,result){
    res.json(result);
}

module.exports = orderedlistsController;