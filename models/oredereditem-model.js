var db = require('../db');
//var con=sql.getConnection();
var ordereditemsModel = require('../models/ordereditemsModel-model');
//main object
var ordereditemsModel = {};

ordereditemsModel.orderid;
ordereditemsModel.itemid;
ordereditemsModel.olid;
ordereditemsModel.qty;

ordereditemsModel.parse = function(body){
    ordereditemsModel.orderid=body.orderid;
    ordereditemsModel.itemid=body.itemid;
    ordereditemsModel.olid=body.olid;
    ordereditemsModel.qty=body.qty;
}

ordereditemsModel.clear = function(){
    ordereditemsModel.orderid=null;
    ordereditemsModel.itemid=null;
    ordereditemsModel.olid=null;
    ordereditemsModel.qty=null;
}
module.exports = ordereditemsModel;
