var express = require('express');
var router = express.Router();

//Controllers
var suppliersController = require('../controllers/suppliers-controller');


//localhost:3000/api/suppliers
router.get('/suppliers', suppliersController.list);
//localhost:3000/api/suppliers/1
router.get('/suppliers/:id', suppliersController.get);
//localhost:3000/api/suppliers
router.put('/suppliers',suppliersController.update);
//localhost:3000/api/suppliers
router.post('/suppliers', suppliersController.add);
//localhost:3000/api/suppliers/10
router.delete('/suppliers/:id', suppliersController.delete);

module.exports = router;