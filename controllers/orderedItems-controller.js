
var db = require('../db');
//var con=sql.getConnection();
var orderModel = require('../models/ordereditem-model');
//main object
var ordereditemsController = {};

//GET ALL
ordereditemsController.list = function(req, res){
    db.query("SELECT * FROM ordereditem;",function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        return res.json(rows);
    });
}

//GET one by ID
ordereditemsController.get = function(req, res){
    db.query("SELECT * FROM ordereditem WHERE orderid = ?;",[req.params.id],function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        return res.json(rows[0]);
    });
}


//GET ALL by olid
ordereditemsController.listByOlid = function(req, res){
    db.query("SELECT * FROM ordereditem WHERE olid = ?;",[req.params.id],function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        return res.json(rows);
    });
}


//POST
ordereditemsController.add = function(req, res){
    orderModel.clear();
    orderModel.parse(req.body);
    db.query("INSERT INTO ordereditem VALUES(?,?,?,?);",[null,orderModel.itemid,orderModel.olid,orderModel.qty],function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        orderModel.clear();
        orderModel.orderid=rows.insertId;
        return res.json({"orderid":orderModel.orderid});
    });
}

//PUT by ID - update the order
ordereditemsController.update = function(req, res){
    orderModel.clear();
    orderModel.parse(req.body);
    db.query("UPDATE ordereditem SET itemid = ?, olid = ?, qty = ? WHERE orderid = ?;",[orderModel.itemid,orderModel.olid,orderModel.qty,orderModel.orderid],function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        return res.json(rows);
    });
}

//DELETE by ID
ordereditemsController.delete = function(req, res){
    db.query("DELETE FROM ordereditem WHERE orderid = ?;",[req.params.id],function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        return res.json(rows);
    });
}


module.exports = ordereditemsController;