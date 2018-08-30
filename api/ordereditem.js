/**
 * Ordereditem router- responsible for ordereditems api routes
 */

const express = require('express');
let router = express.Router();


//Controllers
const ordereditemsController = require('../controllers/ordereditemscontroller');
   
    


// --- Ordereditems API---//

//localhost:3000/api/ordereditems
router.get('/', ordereditemsController.list);
//localhost:3000/api/ordereditems/2
router.get('/:id', ordereditemsController.get);
//localhost:3000/api/ordereditems/olid/5
router.get('/olid/:id', ordereditemsController.listByOlid);
//localhost:3000/api/ordereditems
router.put('/',ordereditemsController.update);
//localhost:3000/api/ordereditems
router.post('/', ordereditemsController.add);
//localhost:3000/api/ordereditems/6
router.delete('/:id', ordereditemsController.delete);


module.exports = router;
