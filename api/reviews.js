/**
 * review router- responsible for reviews api routes
 */


const express = require('express');
let router = express.Router();
const reviewsController = require('../controllers/reviews');

// --- Reviews API---//
router.get('/', reviewsController.list);
router.get('/:id', reviewsController.get);
router.get('/item/:itemid',reviewsController.getReviewsByItem);
router.get('/item/gethonestreviews/:itemid',reviewsController.gethonestreviews);
router.put('/',reviewsController.update);
router.post('/', reviewsController.add);
router.delete('/:id', reviewsController.delete);

module.exports = router;