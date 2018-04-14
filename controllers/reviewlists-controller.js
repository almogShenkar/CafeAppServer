
var db = require('../db');
var reviewlistModel = require('../models/reviewlist-model');
//main object
var reviewlistController = {};

reviewlistController.list = function(req,res){
    db.query("SELECT * FROM reviewlist;",function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        return res.send(rows);
    });
}

reviewlistController.get = function(req,res){
    db.query("SELECT * FROM reviewlist WHERE rlid = ?;",req.params.id,function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        return res.send(rows[0]);
    });
}

reviewlistController.update = function(req,res){
    reviewlistModel.clear();
    reviewlistModel.parse(req.body);
    db.query("UPDATE reviewlist SET itemid=? WHERE rlid=?;",[reviewlistModel.itemid,reviewlistModel.rlid],function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        return res.send(rows);
    });
}

reviewlistController.add = function(req,res){
    reviewlistModel.clear();
    reviewlistModel.parse(req.body);
    db.query("INSERT INTO reviewlist VALUES(?,?);",[null,reviewlistModel.itemid],function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        reviewlistModel.clear();
        reviewlistModel.rlid=rows.insertId;
        return res.json({"rlid":orderedlistsModel.rlid});

    });
}

reviewlistController.delete = function(req,res){
    db.query("DELETE FROM reviewlist WHERE rlid=?;",[req.params.id],function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        return res.send(rows);
    });
}



module.exports = reviewlistController;