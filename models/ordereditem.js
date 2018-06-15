var orderModel ={};

orderModel.orderid;
orderModel.itemid;
orderModel.olid;
orderModel.qty;

orderModel.parse=function(body){
    orderModel.orderid=body.orderid;
    orderModel.itemid=body.itemid;
    orderModel.olid=body.olid;
    orderModel.qty=body.qty;
}

orderModel.clear = function(){
    orderModel.orderid=null;
    orderModel.itemid=null;
    orderModel.olid=null;
    orderModel.qty=null;
}

module.exports = orderModel;
