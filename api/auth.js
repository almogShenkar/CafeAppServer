/**
 * Auth module - responsible for login/signup and password reset
 */

const express = require('express');
const db = require('../db');
const userBluePrint = require('../models/dataObject');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mailSender = require('../utils/mailSender');
let router = express.Router();

/**
 * Signup user - signup new user 
 * input:user details
 * output: return the new userid onSuccess
 *         return err onFail 
 */
router.post('/signup', (req, res, next) => {
    let user = new userBluePrint(req.body);
    let unHashedPass=user.data.password;
    bcrypt.hash(user.data.password, 3, (err, hash) => {
        if (err) {
            return next(err);
        }
        user.data.password = hash;
        let userData = user.getData();
        db.query("INSERT INTO user VALUES(?,?,?,?,?,?,?,?,?);", [userData.userid, userData.email, userData.password, userData.firstname, userData.lastname, userData.credit, userData.phone, userData.url, userData.role], (err, rows) => {
            if (err) {
                return next(err);
            }
            //diff logic for employee role - email invitaion
            if (userData.role === 'Employee') {
                mailSender.setMail(userData.email, "Hi " + userData.firstname + " you've been added as an employee to little cafetria. please use your email and password to connect: " + unHashedPass + " wish to see you soon!");
                mailSender.sendEmail((err,info,next)=>{
                    if(err){
                        return next(err);
                    }
                    userData.userid = rows.insertId;
                    return res.json({ userid: userData.userid });});
            }
            else{
                userData.userid = rows.insertId;
                return res.json({ userid: userData.userid });
            }
            
        });
    });
});


/**
 * Login user - login by email,password 
 * input:email , password
 * output: onSuccess - continue process the request
 *         onFail - throw err (handled next)
 */
router.post('/login', (req, res, next) => {
    // find the user
    let user = new userBluePrint(req.body);
    db.query("SELECT * FROM user WHERE email=?", [user.data.email], (err, rows) => {
        if (err) {
            return next(err);
        }
        if (rows.length === 0) {
            res.status(401);
            return res.json({ success: false, message: 'Authentication failed. User not found.' });
        }
        bcrypt.compare(user.data.password, rows[0].password, (err, result) => {
            if (result) {
                user.data=rows[0];
                // Token-based mechnisem - client should implemnt [Future work]
                /*const payload = {
                    email: user.data.email
                };
                let token = jwt.sign(payload, req.app.get('secretvar'), {
                    expiresIn: '24h' // expires in 24 hours
                });
                */
                // return the information including token as JSON
                return res.json({
                    userid:user.data.userid,
                });
            }
            else {
                //console.log(`user password from db ${rows[0].password} password from req ${bcrypt.hashSync(user.data.password,3)}`);
                res.status(401);
                return res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            }
        });
    });
});


/**
 * Forgetpassword- send defult password to client email
 * input:email
 * output: none
 */
router.post('/forgetpassword',(req,res,next)=>{
    let user=new userBluePrint(req.body);
    let hashValue=bcrypt.hashSync('0000',3);
    db.query("UPDATE user SET password=? WHERE email = ? ",[hashValue,user.data.email],(err,rows)=>{
        if(err){
            return next(err);
        }
        if(rows.affectedRows==1){
            db.query("SELECT email , firstname FROM user WHERE email = ? ",[user.data.email],(err,rows)=>{
                if(err){
                    return next(err);
                }
                user.data=rows[0];
                //user.data.email="almogassu@gmail.com";
                mailSender.setMail(user.data.email,"Dear "+user.data.firstname+" your password has been reset to:0000"+" please change your password. best regards @cafeapp ");
                mailSender.sendEmail((err,info,next)=>{
                    if(err){
                        return next(err);
                    }
                    return res.json({password:"haschanged"});});  
            });
        }
        else{
            res.status(401);
            res.send("bad credentials");
        } 
    });
  
});

/**
 * ChangePassword- change user password
 * input: userid , newpassword
 * output: OnSuccess = haschanged
 *         OnFail = bad credentials
 */
router.post('/changePassword',(req,res,next)=>{
    let user = new userBluePrint(req.body);
    let hashValueOld = bcrypt.hashSync(user.data.oldpassword,3);
    let hashValueNew = bcrypt.hashSync(user.data.newpassword,3);
    db.query("SELECT * FROM user WHERE userid= ?",[user.data.userid],(err,rows)=>{
        if(err){
            return next(err);
        }
        if(rows.length==1){
            bcrypt.compare(user.data.oldpassword,rows[0].password,(err,result)=>{
                if(err){
                    return next(err);
                }
                if(result){
                    db.query("UPDATE user SET password = ? WHERE userid= ?",[hashValueNew,user.data.userid],(err,rows)=>{
                        if(err){
                            next(err);ד
                        }
                        return res.json({password:"haschanged"});
                    });
                }
                else{
                    res.status(401);
                    res.send("bad credentials");            
                }
            });
        }
    });
});



/**
 * Check header request before processing request - client should implement logic to use it [Future work]
 */
/*
router.use((req, res, next) => {
    // check header or url parameters or post parameters for token
    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, req.app.get('secretvar'), function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(401).send({
            success: false,
            message: 'No token provided.'
        });

    }
});
*/


module.exports = router;