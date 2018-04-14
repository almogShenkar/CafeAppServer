
var itemModel ={};

itemModel.itemid;
itemModel.supid;
itemModel.name;
itemModel.description;
itemModel.qty;
itemModel.url;
itemModel.price;
itemModel.type;
itemModel.ispublished;

itemModel.parse = function(body){
    itemModel.itemid=body.itemid;
    itemModel.supid=body.supid;
    itemModel.name=body.name;
    itemModel.description=body.description;
    itemModel.qty=body.qty;
    itemModel.url=body.url;
    itemModel.price=body.price;
    itemModel.type=body.type;
    itemModel.ispublished=body.ispublished;
}


itemModel.clear = function(){
    itemModel.itemid=null;
    itemModel.supid=null;
    itemModel.name=null;
    itemModel.description=null;
    itemModel.qty=null;
    itemModel.url=null;
    itemModel.price=null;
    itemModel.type=null;
    itemModel.ispublished=null;
}

module.exports = itemModel;
