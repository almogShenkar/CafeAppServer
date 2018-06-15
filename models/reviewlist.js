var reviewlistModel ={};

reviewlistModel.rlid;
reviewlistModel.itemid;

reviewlistModel.parse=function(body){
    reviewlistModel.rlid=body.rlid;
    reviewlistModel.itemid=body.itemid;
}

reviewlistModel.clear = function(){
    reviewlistModel.rlid=null;
    reviewlistModel.itemid=null;
        
}
module.exports = reviewlistModel;