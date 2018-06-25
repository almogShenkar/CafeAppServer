
const db = require('../db');
const orderedItemBluePrint = require('../models/dataObject');
//main object
let ordereditemController = {};

//GET ALL
ordereditemController.list = (req, res,next)=>{
    db.query("SELECT * FROM ordereditem;",(err,rows)=>{
        if(err){
            return next(err);
        }
        return res.json(rows);
    });
}

//GET one by ID
ordereditemController.get = (req, res,next)=>{
    db.query("SELECT * FROM ordereditem WHERE orderid = ?;",[req.params.id],(err,rows)=>{
        if(err){
            return next(err);
        }
        return res.json(rows[0]);
    });
}


//GET ALL by olid
ordereditemController.listByOlid = (req, res,next)=>{
    db.query("SELECT * FROM ordereditem WHERE olid = ?;",[req.params.id],(err,rows)=>{
        if(err){
            return next(err);
        }
        return res.json(rows);
    });
}


//POST
ordereditemController.add = (req, res,next)=>{
    let orderedItem=new orderedItemBluePrint(req.body);
    let data=orderedItem.getData();
    db.query("INSERT INTO ordereditem VALUES(?,?,?,?);",[null,data.itemid,data.olid,data.qty],(err,rows)=>{
        if(err){
            return next(err);
        }
        orderedItem.data.orderid=rows.insertId;
        return res.json({orderid:orderedItem.data.orderid});
    });
}

//PUT by ID - update the order
ordereditemController.update = (req, res,next)=>{
    let orderedItem=new orderedItemBluePrint(req.body);
    let data=orderedItem.getData();
    db.query("UPDATE ordereditem SET itemid = ?, olid = ?, qty = ? WHERE orderid = ?;",[data.itemid,data.olid,data.qty,data.orderid],(err,rows)=>{
        if(err){
            return next(err);
        }
        return res.json({changedRows:rows.changedRows});
    });
}

//DELETE by ID
ordereditemController.delete =(req, res,next)=>{
    db.query("DELETE FROM ordereditem WHERE orderid = ?;",[req.params.id],(err,rows)=>{
        if(err){
            return next(err);
        }
        return res.json({affectedRows:rows.affectedRows});
    });
}


module.exports = ordereditemController;
