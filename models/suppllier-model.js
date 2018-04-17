var supplierModel = {};

supplierModel.supid;
supplierModel.name;
supplierModel.phone;
supplierModel.email;




supplierModel.parse = function(body){
    supplierModel.supid = body.supid;
    supplierModel.name = body.name;
    supplierModel.phone = body.phone;
    supplierModel.email = body.email;
}

supplierModel.clear = function(){
    supplierModel.supid = null;
    supplierModel.name = null;
    supplierModel.phone = null;
    supplierModel.email = null;

}

module.exports = supplierModel;