/**
 * Suppliers router- responsible for suppliers api routes
 */

const express = require('express');
let router = express.Router();

//Controllers
const suppliersController = require('../controllers/suppliers');


//localhost:3000/api/suppliers
router.get('/', suppliersController.list);
//localhost:3000/api/suppliers/1
router.get('/:id', suppliersController.get);
//localhost:3000/api/suppliers
router.put('/',suppliersController.update);
//localhost:3000/api/suppliers
router.post('/', suppliersController.add);
//localhost:3000/api/suppliers/10
router.delete('/:id', suppliersController.delete);

module.exports = router;