var db = require('../db');
var itemModel = require('../models/item');
//main object
var itemController = {};

//GET ALL
itemController.list = function(req, res){
    db.query("SELECT * FROM item;",function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        return res.json(rows);
    });
}

//GET one by ID
itemController.get = function(req, res){
    db.query("SELECT * FROM item WHERE itemID = ?;",[req.params.id],function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        return res.json(rows[0]);
    });
}

//POST
itemController.add = function(req, res){
    itemModel.clear();
    itemModel.parse(req.body);
    db.query("INSERT INTO item VALUES(?,?,?,?,?,?,?,?,?,?);",[null,itemModel.supid,itemModel.name,itemModel.description,itemModel.qty,itemModel.url,itemModel.price,itemModel.type,itemModel.ispublished,itemModel.preptime],
    function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        itemModel.clear();
        itemModel.itemid=rows.insertId;
        return res.json({"itemid":itemModel.itemid});
    });
}

//PUT by ID - update the item
itemController.update = function(req, res){
    itemModel.clear();
    itemModel.parse(req.body);
    db.query("UPDATE item SET supid = ?, name = ?, description = ?, qty = ?, url = ?, price = ?, type = ? , ispublished = ?  WHERE itemid = ?;",[itemModel.supid,itemModel.name,itemModel.description,itemModel.qty,itemModel.url,itemModel.price,itemModel.type,itemModel.ispublished,itemModel.itemid],
    function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        return res.json({changedRows:rows.changedRows});
    });
}

itemController.updateQty = function(req,res){
    itemModel.clear();
    itemModel.parse(req.body);
    db.query("UPDATE item SET qty = qty-? WHERE itemid= ?;",[req.params.amount,req.params.id],
    function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        return res.json({changedRows:rows.changedRows});
    })
}

//DELETE by ID
itemController.delete = function(req, res){
    db.query("DELETE FROM item WHERE itemid = ?;",[req.params.id],function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        return res.json({affectedRows:rows.affectedRows});
    });
}

itemController.listByType = function(req,res){
    db.query("SELECT * FROM item WHERE type = ?;",[req.params.type],function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        return res.json(rows);
    });
}


module.exports = itemController;