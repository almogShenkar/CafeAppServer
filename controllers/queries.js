/**
 * QueriesController router- responsible for queries api routes
 */
const queries = require('../utils/queries');
const db = require('../db');


let queriesController = {};

//GET - get the query name by string & input params if exist and return the result as body json
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