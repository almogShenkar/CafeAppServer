/**
 * Queries router- responsible for queries api routes
 */

const express = require('express');
let router = express.Router();

const queriesController = require('../controllers/queries');



//localhost:3000/api/query/monthworstitems
router.get('/:selectedquery',queriesController.run);

module.exports = router;