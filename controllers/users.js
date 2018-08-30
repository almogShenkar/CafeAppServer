/**
 * UserController module - implementaion of user-api 
 * 
 */
const db = require('../db');
const userBluePrint=require('../models/dataObject');
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

//GET All employees - redurant
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

//POST - send sms to the user when order is ready 
userController.sendSms = (req,res,next)=>{
    db.query("SELECT firstname,phone FROM user WHERE userid=(SELECT userid FROM orderlist WHERE olid=?)",[req.params.olid],(err,rows)=>{
        if(err){
            return next(err);
        }
        smsSender.sendSms(rows[0].phone,"Hello "+rows[0].firstname+" , your order "+req.params.olid+" is ready for pick up! please come and take it , Enjoy @cafeapp ",next);
        
    });
}

//GET - return user credit
userController.getCredit = (req,res)=>{
    db.query("SELECT credit FROM user WHERE userid = ? ",req.params.id,(err,rows)=>{
        if(err){
            console.log(err);
            return res.send(err);
        }
        return res.json(rows[0]);
    });
}


module.exports = userController;