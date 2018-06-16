var express = require('express');
var router = express.Router();

//Controllers
var orderedlistsController = require('../controllers/orderedlists');


// --- OrderedLists API---//

//localhost:3000/api/orderedlists
router.get('/', orderedlistsController.list);
//localhost:3000/api/orderedlists/48
router.get('/:id', orderedlistsController.getByOlid);
//localhost:3000/api/orderedlists/userid/2
router.get('/userid/:id', orderedlistsController.listByUserid);
//localhost:3000/api/orderedlists/status/incoming
router.get('/status/:status', orderedlistsController.listByStatus);
//localhost:3000/api/orderedlists
router.put('/',orderedlistsController.update);
//localhost:3000/api/orderedlists
router.post('/', orderedlistsController.add);
//localhost:3000/api/orderedlists/49
router.delete('/:id', orderedlistsController.delete);
//post "CheckTime" TODO
router.post('/orderedlistsTime', orderedlistsController.checkTime);



module.exports = router;