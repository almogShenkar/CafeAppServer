/**
 * ReviewController module - implementaion of review-api 
 * 
 */
const db = require('../db');
const reviewBluePrint = require('../models/dataObject');
let reviewController = {};

//GET ALL
reviewController.list = (req,res,next)=>{
    db.query("SELECT * FROM review;",(err,rows)=>{
        if(err){
            return next(err);
        }
        return res.json(rows);
    });
}

//GET one by id
reviewController.get = (req,res,next)=>{
    db.query("SELECT * FROM review WHERE revid = ?;",req.params.id,(err,rows)=>{
        if(err){
            return next(err);
        }
        return res.json(rows[0]);
    });
}

//GET 3 minimun rank review Union 3 maximum rank reviews by id
reviewController.gethonestreviews = (req,res,next)=>{
    db.query("(SELECT * FROM review WHERE rlid IN(SELECT rlid FROM reviewlist WHERE itemid=?) ORDER BY stars DESC LIMIT 4) UNION ALL (SELECT * FROM review  WHERE rlid IN(SELECT rlid FROM reviewlist WHERE itemid=?) ORDER BY stars DESC LIMIT 4);",[req.params.itemid,req.params.itemid],(err,rows)=>{
        if(err){
            return next(err);
        }
        return res.json(rows[0]);
    });
}

//GET - get all reviews of item by itemid
reviewController.getReviewsByItem =(req,res,next)=>{
    db.query("SELECT * FROM review WHERE rlid in(SELECT rlid FROM reviewlist WHERE itemid=?)",req.params.itemid,(err,rows)=>{
        if(err){
            return next(err);
        }
        return res.json(rows);
    });
}


//PUT - update existing review
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

//POST - create new review
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

//DELETE - 
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
