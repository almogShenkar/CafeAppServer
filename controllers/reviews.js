
const db = require('../db');
const reviewBluePrint = require('../models/review');
//main object
let reviewController = {};

reviewController.list = (req,res,next)=>{
    db.query("SELECT * FROM review;",(err,rows)=>{
        if(err){
            return next(err);
        }
        return res.json(rows);
    });
}

reviewController.get = (req,res,next)=>{
    db.query("SELECT * FROM review WHERE revid = ?;",req.params.id,(err,rows)=>{
        if(err){
            return next(err);
        }
        return res.json(rows[0]);
    });
}

//3 desc , 3 asc
reviewController.gethonestreviews = (req,res,next)=>{
    db.query("SELECT * FROM review WHERE revid = ? ORDER BY;",req.params.id,(err,rows)=>{
        if(err){
            return next(err);
        }
        return res.json(rows[0]);
    });
}

reviewController.getReviewsByItem =(req,res,next)=>{
    db.query("SELECT * FROM review WHERE revid in(SELECT rlid FROM reviewlist WHERE itemid=?)",req.params.itemid,(err,rows)=>{
        if(err){
            return next(err);
        }
        return res.json(rows);
    });
}

reviewController.update = (req,res,next)=>{
    let review = new reviewBluePrint(req.body);
    let reviewData=review.getData();
    db.query("UPDATE review SET userid=?, rlid=?, stars=?, comment = ? WHERE revid = ?;",[reviewData.userid,reviewData.rlid,reviewData.stars,reviewData.comment,reviewData.revid],
    (err,rows)=>{
        if(err){
            return next(err);
        }
        return res.json({changedRows:rows.changedRows});
    });
}

reviewController.add = (req,res,next)=>{
    let review = new reviewBluePrint(req.body);
    let reviewData=review.getData();
    db.query("INSERT INTO review VALUES(?,?,?,?,?);",[null,reviewData.userid,reviewData.rlid,reviewData.stars,reviewData.comment],
    (err,rows)=>{
        if(err){
            return next(err);
        }
        review.data.revid=rows.insertId;
        return res.json({revid:review.data.revid});
    });
}

reviewController.delete = (req,res,next)=>{
    db.query("DELETE FROM review WHERE revid = ?",[req.params.id],
    (err,rows)=>{
        if(err){
            return next(err);
        }
        return res.json({affectedRows:rows.affectedRows});

    });
}



module.exports = reviewController;
