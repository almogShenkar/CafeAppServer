var queries = require('../queries');

var queriesController = {};

queriesController.run = function(req,res){
    var query = req.params.selectedquery;
    db.query(queries[query] , function(err,rows){
        if(err){
            console.log(err);
            return res.send(err);
        }
        return res.json(rows);
    });
}




module.exports = queriesController;