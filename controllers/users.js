const db = require('../db');
const userBluePrint=require('../models/user');
const smsSender=require('../utils/smsSender');
const mailSender=require('../utils/mailSender');

let userController = {};

//GET ALL
userController.list = (req, res, next)=>{
    db.query("SELECT * FROM user;",(err,rows)=>{
        if(err){
            return next(err);
        }
        rows.forEach(element => {
            let user = new userBluePrint(element);
            user.deletePassword();
        });
        return res.json(rows);
    });

}

//GET one by ID
userController.get = (req, res,next)=>{
    db.query("SELECT * FROM user WHERE userid = ?;",[req.params.id],(err,rows)=>{
        if(err){
            return next(err);
        }
        let user=new userBluePrint(rows[0]);
        user.deletePassword();
        return res.json(rows[0]);
    });
}

//GET All by role
userController.getByRole = (req, res,next)=>{
    db.query("SELECT * FROM user WHERE role = ?;",[req.params.role],(err,rows)=>{
        if(err){
            return next(err);
        }
        rows.forEach(element => {
            let user=new userBluePrint(element);
            user.deletePassword();    
        });
        return res.json(rows);
    });
}

//POST - SIGNUP
userController.signup = (req, res,next)=>{
    let user = new userBluePrint(req.body);
    let userData=user.getData();
    //VALUES (NULL, 'eli@gmail.com', '1234', 'eli', 'cohen', '1000', '0542254548','Student')
    db.query("INSERT INTO user VALUES(?,?,?,?,?,?,?,?,?);",[userData.userid,userData.email,userData.password,userData.firstname,userData.lastname,userData.credit,userData.phone,userData.url,userData.role],(err,rows)=>{
        if(err){
            return next(err);
        }
        if(userData.role==='Employee'){
            mailSender.sendEmail(userData.email,"Hi "+userData.firstname+" you've been added as an employee to little cafetria. please use your email and password to connect: "+userData.password+" wish to see you soon!");
        }
        userData.userid=rows.insertId;
        return res.json({userid:userData.userid});
    });
}

userController.listEmployee=(req,res,next)=>{
    db.query("SELECT * FROM user role='Employee';",(err,rows)=>{
        if(err){
            return next(err);
        }
        rows.forEach(element => {
            let user = new userBluePrint(element);
            user.deletePassword();
        });
        return res.json(rows);
    });
}

//LOGIN
userController.login = (req, res, next)=>{
    let user = new userBluePrint(req.body);
    let userData = user.getData();
    db.query("SELECT * FROM user WHERE email = ? AND password = ?;",[userData.email,userData.password],(err,rows)=>{
        if(err){
            return next(err);
        }
        if (rows.length==1){
            user.data.userid=rows[0].userid;
            return res.json({userid:user.data.userid});
        }
        else
            return res.send("bad credentials");
    });
}

//PUT by ID - update credit
userController.updateCredit = (req, res, next)=>{
    let user = new userBluePrint(req.body);
    let userData=user.getData();
    db.query("UPDATE user SET credit = ? WHERE userid = ?;",[userData.credit,userData.userid],(err,rows)=>{
        if(err){
            return next(err);
        }
        return res.json({changedRows:rows.changedRows});
    });
}

//PUT by ID - update user
userController.update= (req, res, next)=>{
    let user=new userBluePrint(req.body);
    let userData=user.getData();
    db.query("UPDATE user SET email=? , password=?, firstname=?, lastname=? , credit=?, phone=?, url=?, role=?  WHERE userid = ?;",[userData.email,userData.password,userData.firstname,userData.lastname,userData.credit,userData.phone,userData.url,userData.role,userData.userid],(err,rows)=>{
        if(err){
            return next(err);
        }
        return res.json({changedRows :rows.changedRows});
    });
}

//PUT by ID - update url
userController.updateUrl= (req, res,next)=>{
    let user= new userBluePrint(req.body);
    let userData=user.getData();
    db.query("UPDATE user SET url=? WHERE userid = ?;",[userData.url,userData.userid],(err,rows)=>{
        if(err){
            return next(err);

        }
        return res.json({changedRows :rows.changedRows });
    });
}

//DELETE by ID
userController.delete = (req, res ,next)=>{
    db.query("DELETE FROM user WHERE userid = ?;",[req.params.id],(err,rows)=>{
        if(err){
            return next(err);
        }
        return res.json({affectedRows:rows.affectedRows});
    });
}

userController.sendSms = (req,res,next)=>{
    db.query("SELECT firstname,phone FROM user WHERE userid=(SELECT userid FROM orderlist WHERE olid=?)",[req.params.olid],(err,rows)=>{
        if(err){
            return next(err);
        }
        rows[0].phone="0544222722";
        smsSender.sendSms(rows[0].phone,"Hello "+rows[0].firstname+" , your order "+req.params.olid+" is ready for pick up! please come and take it , Enjoy @cafeapp ");
        
    });
}

userController.getCredit = (req,res)=>{
    db.query("SELECT credit FROM user WHERE userid = ? ",req.params.id,(err,rows)=>{
        if(err){
            console.log(err);
            return res.send(err);
        }
        return res.json(rows[0]);
    });
}

//forget password user
userController.forgetPassword = (req,res,next)=>{
    let user=new userBluePrint(req.body);
    db.query("UPDATE user SET password='12345678' WHERE userid = ? AND email = ? ",[user.data.userid,user.data.email],(err,rows)=>{
        if(err){
            return next(err);
        }
        if(rows.affectedRows==1){
            db.query("SELECT email , firstname FROM user WHERE userid = ? ",[user.data.userid],(err,rows)=>{
                if(err){
                    return next(err);
                }
                user.data=rows[0];
                user.data.email="almogassu@gmail.com"
                mailSender.sendEmail(user.data.email,"Dear "+user.data.firstname+" your password has been reset to:12345678"+" please change your password. best regards @cafeapp ")
                return res.json({password:"haschanged"});
            })
        }
        else{
            res.status(404);
            res.send("bad credentials");
        } 
    });
   
}

userController.changePassword = (req,res,next)=>{
    let user = new userBluePrint(req.body);
    db.query("SELECT * FROM user WHERE userid= ? AND password = ? ",[user.data.userid,user.data.oldpassword],(err,rows)=>{
        if(err){
            return next(err);
        }
        if(rows.length==1){
            db.query("UPDATE user SET password = ? WHERE userid= ?",[user.data.newpassword,user.data.userid],(err,rows)=>{
                if(err){
                    next(err);
                }
                return res.json({password:"haschanged"});
            });
        }
        else{
            res.status(404);
            res.send("bad credentials");
        }
    });
}


module.exports = userController;