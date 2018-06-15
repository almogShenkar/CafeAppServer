var express = require('express');
var router = express.Router();

//Controllers
var shiftsController = require('../controllers/shifts');

// --- Shifts API---//
router.get('/', shiftsController.list);
router.get('/:id', shiftsController.get);
router.put('/',shiftsController.update);
router.post('/', shiftsController.add);
router.delete('/:id', shiftsController.delete);

module.exports = router;