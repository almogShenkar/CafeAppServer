var express = require('express');
var router = express.Router();


//Controllers
var orderitemController = require('../controllers/ordereditems');
   
    


// --- Ordereditems API---//

//localhost:3000/api/ordereditems
router.get('/', orderitemController.list);
//localhost:3000/api/ordereditems/2
router.get('/:id', orderitemController.get);
//localhost:3000/api/ordereditems/olid/5
router.get('/olid/:id', orderitemController.listByOlid);
//localhost:3000/api/ordereditems
router.put('/',orderitemController.update);
//localhost:3000/api/ordereditems
router.post('/', orderitemController.add);
//localhost:3000/api/ordereditems/6
router.delete('/:id', orderitemController.delete);


module.exports = router;
