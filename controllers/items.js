const db = require('../db');
const itemBluePrint = require('../models/item');
//main object
let itemController = {};


//GET ALL
itemController.list = (req, res,next)=>{
    db.query("SELECT * FROM item;",(err,rows)=>{
        if(err){
            return next(err);
        }
        return res.json(rows);
    });
}

//GET one by ID
itemController.get = (req, res , next)=>{
    db.query("SELECT * FROM item WHERE itemID = ?;",[req.params.id],(err,rows)=>{
        if(err){
            return next(err);
        }
        return res.json(rows[0]);
    });
}

//POST
itemController.add =(req, res, next)=>{
    let item = new itemBluePrint(req.body);
    let itemData = item.getData();
    db.query("INSERT INTO item VALUES(?,?,?,?,?,?,?,?,?,?);",[null,itemData.supid,itemData.name,itemData.description,itemData.qty,itemData.url,itemData.price,itemData.type,itemData.ispublished,itemData.preptime],
    (err,rows)=>{
        if(err){
            return next(err);
        }
        
        item.data.itemid=rows.insertId;
        return res.json({"itemid":item.data.itemid});
    });
}

//PUT by ID - update the item
itemController.update = (req, res,next)=>{
    let item = new itemBluePrint(req.body);
    let itemData = item.getData();
    db.query("UPDATE item SET supid = ?, name = ?, description = ?, qty = ?, url = ?, price = ?, type = ? , ispublished = ? , preptime = ? WHERE itemid = ?;",[itemData.supid,itemData.name,itemData.description,itemData.qty,itemData.url,itemData.price,itemData.type,itemData.ispublished,itemData.preptime,itemData.itemid],
    (err,rows)=>{
        if(err){
            return next(err);
        }
        return res.json({changedRows:rows.changedRows});
    });
}

itemController.updateQty = (req,res,next)=>{
    db.query("UPDATE item SET qty = qty-? WHERE itemid= ?;",[req.params.amount,req.params.id],
    (err,rows)=>{
        if(err){
            return next(err);
        }
        return res.json({changedRows:rows.changedRows});
    })
}

//DELETE by ID
itemController.delete = (req, res,next)=>{
    db.query("DELETE FROM item WHERE itemid = ?;",[req.params.id],(err,rows)=>{
        if(err){
            return next(err);
        }
        return res.json({affectedRows:rows.affectedRows});
    });
}

itemController.listByType =(req,res,next)=>{
    db.query("SELECT * FROM item WHERE type = ?;",[req.params.type],(err,rows)=>{
        if(err){
            return next(err);
        }
        return res.json(rows);
    });
}


module.exports = itemController;