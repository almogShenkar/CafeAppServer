const express = require('express');
let router = express.Router();

//Controllers
const reviewlistsController = require('../controllers/reviewlists');



// --- Reviewlists API---//
router.get('/', reviewlistsController.list);
router.get('/:id', reviewlistsController.get);
router.get('/:userid/:orderid', reviewlistsController.getItemRevByUser);
router.put('/',reviewlistsController.update);
router.post('/', reviewlistsController.add);
router.delete('/:id', reviewlistsController.delete);

module.exports = router;