var orderlistModel = {};

orderlistModel.olid;
orderlistModel.userid;
orderlistModel.totalprice;
orderlistModel.ol_dttm;
orderlistModel.ol_dttm_real;
orderlistModel.status;
orderlistModel.hasreview;


orderlistModel.parse = function(body){
    orderlistModel.olid=body.olid;
    orderlistModel.userid=body.userid;
    orderlistModel.totalprice=body.totalprice;
    orderlistModel.ol_dttm=body.ol_dttm;
    orderlistModel.ol_dttm_real=body.ol_dttm_real;;
    orderlistModel.status=body.status;
    orderlistModel.hasreview=body.hasreview;

}

orderlistModel.clear = function(){
    orderlistModel.olid = null;
    orderlistModel.userid = null;
    orderlistModel.totalprice=null;
    orderlistModel.ol_dttm=null;
    orderlistModel.ol_dttm_real=null;
    orderlistModel.status=null;
    orderlistModel.hasreview=null;
}

module.exports = orderlistModel;