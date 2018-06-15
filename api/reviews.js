var express = require('express');
var router = express.Router();

//Controllers

var reviewsController = require('../controllers/reviews');

// --- Reviews API---//
router.get('/', reviewsController.list);
router.get('/:id', reviewsController.get);
router.get('/item/:itemid',reviewsController.getReviewsByItem);
router.put('/',reviewsController.update);
router.post('/', reviewsController.add);
router.delete('/:id', reviewsController.delete);

module.exports = router;