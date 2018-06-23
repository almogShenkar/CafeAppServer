const express = require('express');
let router = express.Router();

//Controllers
const shiftsController = require('../controllers/shifts');

// --- Shifts API---//
router.get('/', shiftsController.list);
router.get('/:id', shiftsController.get);
router.put('/',shiftsController.update);
router.post('/', shiftsController.add);
router.delete('/:id', shiftsController.delete);

module.exports = router;