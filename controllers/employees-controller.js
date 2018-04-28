var db = require('../db');
var employeeModel = require('../models/employee-model');
//main object
var employeeController = {};

employeeController.list = function(req,res){
    db.query("SELECT * FROM EMPLOYEE",function(err,rows){
        if(err){
            console.log(err);
            res.send(err);
            return;
        }
        return res.json(rows);
    });
}

employeeController.get = function(req,res){
    db.query("SELECT * FROM EMPLOYEE WHERE empid=?",[req.params.id],function(err,rows){
        if(err){
            console.log(err);
            res.send(err);
            return;
        }
        return res.json(rows[0]);
    });
}

employeeController.add = function(req,res){
    employeeModel.clear();
    employeeModel.parse(req.body);
    db.query("INSERT INTO EMPLOYEE VALUES(?,?,?,?,?,?)",[employeeModel.empid,employeeModel.email,employeeModel.password,employeeModel.firstname,employeeModel.lastname,employeeModel.phone],function(err,rows){
        if(err){
            console.log(err);
            res.send(err);
            return;
        }
        employeeModel.clear();
        employeeModel.empid=rows.insertId;
        return res.json({"empid":employeeModel.empid});
    });
}

employeeController.update = function(req,res){
    employeeModel.clear();
    employeeModel.parse(req.body);
    db.query("UPDATE EMPLOYEE SET email=? , password=?, firstname=? , lastname=?,phone=? WHERE empid=?",[employeeModel.email,employeeModel.password,employeeModel.firstname,employeeModel.lastname,employeeModel.phone,employeeModel.empid],function(err,rows){
        if(err){
            console.log(err);
            res.send(err);
            return;
        }
        return res.json(rows);
    });
}

employeeController.delete = function(req,res){
    db.query("DELETE FROM EMPLOYEE WHERE empid=?",[req.params.id],function(err,rows){
        if(err){
            console.log(err);
            res.send(err);
            return;
        }
        return res.json(rows);
    });
}

module.exports = employeeController;