const queries = require('../utils/queries');
const db = require('../db');


let queriesController = {};

queriesController.run = (req,res,next)=>{
    let query = req.params.selectedquery;
    console.log(queries[query](req.query));
    db.query(queries[query](req.query) , (err,rows)=>{
        if(err){
            return next(err);
        }
        return res.json(rows);
    });
}




module.exports = queriesController;