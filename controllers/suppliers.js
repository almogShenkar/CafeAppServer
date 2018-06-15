var db = require('../db');
var supplierModel = require('../models/suppllier');
//main object
var supplierController = {};

supplierController.list = function(req,res){
    db.query("SELECT * FROM supplier;",function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        return res.json(rows);
    });
}

supplierController.get = function(req,res){
    db.query("SELECT * FROM supplier WHERE supid = ? ;",[req.params.id],function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        return res.json(rows[0]);
    });
}

supplierController.add = function(req,res){
    supplierModel.clear();
    supplierModel.parse(req.body);
    db.query("INSERT INTO supplier VALUES(?,?,?,?);",[null,supplierModel.name,supplierModel.phone,supplierModel.email],function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        supplierModel.clear();
        supplierModel.supid=rows.insertId;
        return res.json({"supid":supplierModel.supid});
    });

}

supplierController.update = function(req,res){
    supplierModel.clear();
    supplierModel.parse(req.body);
    db.query("UPDATE supplier SET name = ? , phone = ? , email = ? WHERE supid = ?;",[supplierModel.name,supplierModel.phone,supplierModel.email,supplierModel.supid],function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        return res.json(rows);
    });
}


//DELETE
supplierController.delete = function(req,res){
    db.query("DELETE FROM supplier WHERE supid = ?;",[req.params.id],function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        return res.json(rows);
    });
}

module.exports = supplierController;