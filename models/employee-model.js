var employeeModel = {};

employeeModel.empid;
employeeModel.email;
employeeModel.password;
employeeModel.firstname;
employeeModel.lastname;
employeeModel.phone;

employeeModel.parse = function(body){
    employeeModel.empid=body.empid;
    employeeModel.email=body.email;
    employeeModel.password=body.password;
    employeeModel.firstname=body.firstname;
    employeeModel.lastname=body.lastname;
    employeeModel.phone=body.phone;
}

employeeModel.clear = function(){
    employeeModel.empid=null;
    employeeModel.email=null;
    employeeModel.password=null;
    employeeModel.firstname=null;
    employeeModel.lastname=null;
    employeeModel.phone=null;
}

module.exports = employeeModel;