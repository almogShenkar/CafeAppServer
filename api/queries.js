var express = require('express');
var router = express.Router();

//Controllers
var queriesController = require('../controllers/queries-controller');



//localhost:3000/api/query/monthworstitems
router.get('/query/:selectedquery',queriesController.run);

module.exports = router;