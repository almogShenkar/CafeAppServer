var queries = require('../utils/queries');
var db = require('../db');


var queriesController = {};

queriesController.run = function(req,res){
    var query = req.params.selectedquery;
    console.log(req.query.param1);
    console.log(queries[query](req.query));
    db.query(queries[query](req.query) , function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        return res.json(rows);
    });
}




module.exports = queriesController;