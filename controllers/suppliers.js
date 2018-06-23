const db = require('../db');
const supplierBluePrint = require('../models/suppllier');
//main object
let supplierController = {};

supplierController.list = (req,res,next)=>{
    db.query("SELECT * FROM supplier;",(err,rows)=>{
        if(err){
            return next(err);
        }
        return res.json(rows);
    });
}

supplierController.get = (req,res,next)=>{
    db.query("SELECT * FROM supplier WHERE supid = ? ;",[req.params.id],(err,rows)=>{
        if(err){
            return next(err);
        }
        return res.json(rows[0]);
    });
}

supplierController.add = (req,res,next)=>{
    let suppllier=new supplierBluePrint(req.body);
    let suppllierData=suppllier.getData();
    db.query("INSERT INTO supplier VALUES(?,?,?,?);",[null,suppllierData.name,suppllierData.phone,suppllierData.email],(err,rows)=>{
        if(err){
            return next(err);
        }
        suppllierData.data.supid=rows.insertId;
        return res.json({supid:suppllierData.data.supid});
    });

}

supplierController.update = (req,res,next)=>{
    let supplier=new supplierBluePrint(req.body);
    suppllierData=supplier.getData();
    db.query("UPDATE supplier SET name = ? , phone = ? , email = ? WHERE supid = ?;",[suppllierData.name,suppllierData.phone,suppllierData.email,suppllierData.supid],(err,rows)=>{
        if(err){
            return next(err);
        }
        return res.json({changedRows:rows.changedRows});
    });
}


//DELETE
supplierController.delete = (req,res)=>{
    db.query("DELETE FROM supplier WHERE supid = ?;",[req.params.id],(err,rows)=>{
        if(err){
            return next(err);
        }
        return res.json({affectedRows:rows.affectedRows});
    });
}

module.exports = supplierController;