var db = require('../db');
var userModel = require('../models/user');
//main object
var userController = {};

//GET ALL
userController.list = function(req, res){
    
    db.query("SELECT * FROM user;",function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        return res.json(rows);
    });

}

//GET one by ID
userController.get = function(req, res){
    db.query("SELECT * FROM user WHERE userid = ?;",[req.params.id],function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        return res.json(rows[0]);
    });
}

//GET All by role
userController.getByRole = function(req, res){
    db.query("SELECT * FROM user WHERE role = ?;",[req.params.role],function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        return res.json(rows);
    });
}



//POST - SIGNUP
userController.signup = function(req, res){
    userModel.clear();
    userModel.parse(req.body);
    //VALUES (NULL, 'eli@gmail.com', '1234', 'eli', 'cohen', '1000', '0542254548','Student')
    db.query("INSERT INTO user VALUES(?,?,?,?,?,?,?,?,?);",[userModel.userid,userModel.email,userModel.password,userModel.firstname,userModel.lastname,userModel.credit,userModel.phone,userModel.url,userModel.role],function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        userModel.clear;
        userModel.userid=rows.insertId;
        return res.json({userid:userModel.userid});
    });
}

//POST - SIGNUP employee
userController.signupEmployee = function(req, res){
    userModel.clear();
    userModel.parse(req.body);
    //VALUES (NULL, 'eli@gmail.com', '1234', 'eli', 'cohen', '1000', '0542254548')
    db.query("INSERT INTO user VALUES(?,?,?,?,?,?,?);",[userModel.userid,userModel.email,userModel.password,userModel.firstname,userModel.lastname,userModel.credit,userModel.phone],function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        userModel.clear;
        userModel.userid=rows.insertId;
        return res.json({userid:userModel.userid});
    });
}

//LOGIN
userController.login = function(req, res){
    userModel.clear();
    userModel.parse(req.body);
    db.query("SELECT * FROM user WHERE email = ? AND password = ?;",[userModel.email,userModel.password],function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        if (rows.length==1){
            userModel.clear();
            userModel.userid=rows[0].userid;
            return res.json({userid:userModel.userid});
        }
        else
            return res.send("bad credentials");
    });
}

//PUT by ID - update credit
userController.updateCredit = function(req, res){
    userModel.clear();
    userModel.parse(req.body);
    db.query("UPDATE user SET credit = ? WHERE userid = ?;",[userModel.credit,userModel.userid],function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        return res.json({changedRows:rows.changedRows});
    });
}

//PUT by ID - update user
userController.update= function(req, res){
    userModel.clear();
    userModel.parse(req.body);
    db.query("UPDATE user SET email=? , password=?, firstname=?, lastname=? , credit=?, phone=?, url=?, role=?  WHERE userid = ?;",[userModel.email,userModel.password,userModel.firstname,userModel.lastname,userModel.credit,userModel.phone,userModel.url,userModel.role,userModel.userid],function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        return res.json({changedRows :rows.changedRows});
    });
}

//PUT by ID - update url
userController.updateUrl= function(req, res){
    userModel.clear();
    userModel.parse(req.body);
    db.query("UPDATE user SET url=? WHERE userid = ?;",[userModel.url,userModel.userid],function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        return res.json({changedRows :rows.changedRows });
    });
}

//DELETE by ID
userController.delete = function(req, res){
    db.query("DELETE FROM user WHERE userid = ?;",[req.params.id],function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        return res.json({affectedRows:rows.affectedRows});
    });
}



module.exports = userController;