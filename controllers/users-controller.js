var db = require('../db');
var userModel = require('../models/user-model');
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


//POST - SIGNUP
userController.signup = function(req, res){
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
        return res.json({"userid":userModel.userid});
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
            return res.json({"userid":userModel.userid});
        }
        else
            return res.send("bad credentials");
    });
}

//PUT by ID - update credit
userController.update = function(req, res){
    userModel.clear();
    userModel.parse(req.body);
    db.query("UPDATE user SET credit = ? WHERE userid = ?;",[userModel.credit,req.params.id],function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        return res.json(rows);
    });
}

//DELETE by ID
userController.delete = function(req, res){
    db.query("DELETE FROM user WHERE userid = ?;",[req.params.id],function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        return res.json(rows);
    });
}



module.exports = userController;