var express = require('express');
var router = express.Router();


//Controllers
var ordereditemController = require('../controllers/ordereditems');
    


// --- Ordereditems API---//

//localhost:3000/api/ordereditems
router.get('/', ordereditemController.list);
//localhost:3000/api/ordereditems/2
router.get('/:id', ordereditemController.get);
//localhost:3000/api/ordereditems/olid/5
router.get('/olid/:id', ordereditemController.listByOlid);
//localhost:3000/api/ordereditems
router.put('/',ordereditemController.update);
//localhost:3000/api/ordereditems
router.post('/', ordereditemController.add);
//localhost:3000/api/ordereditems/6
router.delete('/:id', ordereditemController.delete);


module.exports = router;
