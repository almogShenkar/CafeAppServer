
const db = require('../db');
const reviewlistBluePrint = require('../models/dataObject');
//main object
let reviewlistController = {};

reviewlistController.list = (req,res,next)=>{
    db.query("SELECT * FROM reviewlist;",(err,rows)=>{
        if(err){
            return next(err);
        }
        return res.send(rows);
    });
}

reviewlistController.get = (req,res,next)=>{
    db.query("SELECT * FROM reviewlist WHERE rlid = ?;",req.params.id,(err,rows)=>{
        if(err){
            return next(err);
        }
        return res.send(rows[0]);
    });
}

reviewlistController.update = (req,res,next)=>{
    let reviewlist = new reviewlistBluePrint(req.body);
    let revirelistData=reviewlist.getData();
    db.query("UPDATE reviewlist SET itemid=? WHERE rlid=?;",[revirelistData.itemid,revirelistData.rlid],(err,rows)=>{
        if(err){
            return next(err);
        }
        return res.json({changedRows:rows.changedRows});
    });
}

reviewlistController.add = (req,res,next)=>{
    let reviewlist = new revirelistData(req.body);
    db.query("INSERT INTO reviewlist VALUES(?,?);",[null,reviewlistModel.itemid],(err,rows)=>{
        if(err){
            return next(err);
        }
        reviewlist.data.rlid=rows.insertId;
        return res.json({rlid:reviewlist.data.rlid});
    });
}

reviewlistController.getItemRevByUser = (req,res,next)=>{
    db.query("SELECT * from reviewlist left JOIN review on (reviewlist.rlid=review.rlid) where userid=? and itemid in (SELECT itemid FROM orderlist left outer JOIN ordereditem ON ordereditem.olid=?);",
        [req.params.userid,req.params.orderid],(err,rows)=>{
            if(err){
                return next(err);
            }
            return res.json(rows);
        });
}



reviewlistController.hasReviewlistByItem=(req,res,next)=>{
    db.query("SELECT * from reviewlist WHERE itemid = ? ;",req.params.itemid,(err,rows)=>{
        if(err){
            return next(err);
        }
        if(rows.length==1){
            return res.json(rows[0]);
        }
        return res.json({rlid:-1});
    });
}

reviewlistController.delete = (req,res,next)=>{
    db.query("DELETE FROM reviewlist WHERE rlid=?;",[req.params.id],(err,rows)=>{
        if(err){
            return next(err);
        }
        return res.json({affectedRows:rows.affectedRows});
    });
}


module.exports = reviewlistController;