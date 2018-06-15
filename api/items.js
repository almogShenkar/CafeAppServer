var express = require('express');
var router = express.Router();

//Controllers
var itemsController = require('../controllers/items-controller');

router.get('/', function (req, res) {
  res.send('API :: Hello World!');
});


// --- Items API---//

//localhost:3000/api/items
router.get('/', itemsController.list);
//localhost:3000/api/items/1
router.get('/:id', itemsController.get);
//localhost:3000/api/items/type/drink
router.get('/type/:type', itemsController.listByType);
//localhost:3000/api/items
router.put('/',itemsController.update);
//localhost:3000/api/items
router.post('/', itemsController.add);
//localhost:3000/api/items/27
router.delete('/:id', itemsController.delete);


module.exports = router;