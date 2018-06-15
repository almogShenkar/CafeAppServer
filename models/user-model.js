

var userModel ={};

userModel.userid;
userModel.firstname;
userModel.lastname;
userModel.email;
userModel.password;
userModel.credit;
userModel.phone;    
userModel.url;
userModel.role;    

userModel.parse = function(body){
    userModel.userid=body.userid;
    userModel.firstname=body.firstname;
    userModel.lastname=body.lastname;
    userModel.email=body.email;
    userModel.password=body.password;
    userModel.credit=body.credit;
    userModel.phone=body.phone;
    userModel.url=body.url;
    userModel.role=body.role;
}

userModel.clear = function(){
    userModel.userid=null;
    userModel.email=null; 
    userModel.password=null;
    userModel.firstname=null;
    userModel.lastname=null;
    userModel.credit=null;
    userModel.phone=null;
    userModel.url=null;
    userModel.role=null;

}

module.exports = userModel;
