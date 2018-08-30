/**
 * Items router- responsible for items api routes
 */

const express = require('express');
let router = express.Router();

const itemsController = require('../controllers/items');



// --- Items API---//

//localhost:3000/api/items
router.get('/', itemsController.list);
//localhost:3000/api/items/1
router.get('/:id', itemsController.get);
//localhost:3000/api/items/type/drink
router.get('/type/:type', itemsController.listByType);
//localhost:3000/api/items
router.put('/',itemsController.update);
//localhost:3000/api/items/deduction/12/3
router.put('/deduction/:id/:amount',itemsController.updateQty);
//localhost:3000/api/items
router.post('/', itemsController.add);
//localhost:3000/api/items/27
router.delete('/:id', itemsController.delete);


module.exports = router;