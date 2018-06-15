var reviewModel = {};

reviewModel.revid;
reviewModel.userid;
reviewModel.rlid;
reviewModel.stars;
reviewModel.comment;


reviewModel.parse = function(body){
    reviewModel.revid =body.revid;
    reviewModel.userid=body.userid;
    reviewModel.rlid=body.rlid;
    reviewModel.stars=body.stars;
    reviewModel.comment=body.comment;
}

reviewModel.clear = function(){
    reviewModel.revid=null;
    reviewModel.userid=null;
    reviewModel.rlid=null;
    reviewModel.stars=null;
    reviewModel.comment=null;

}

module.exports = reviewModel;