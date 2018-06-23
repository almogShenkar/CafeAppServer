const express = require('express');
let router = express.Router();

//Controllers
const orderedlistsController = require('../controllers/orderedlists');


// --- orderedlist API---//

//localhost:3000/api/orderedlist
router.get('/', orderedlistsController.list);
//localhost:3000/api/orderedlist/userid/2
router.get('/userid/:id', orderedlistsController.listByUserid);
//localhost:3000/api/orderedlist/status/incoming
router.get('/status/:status', orderedlistsController.listByStatus);
//localhost:3000/api/orderedlist/todayfutureorders
router.get('/todayfutureorders',orderedlistsController.todayfutureorders);
//localhost:3000/api/orderedlist/todayactiveorders
router.get('/todayactiveorders',orderedlistsController.todayactiveorders);
//localhost:3000/api/orderedlist
router.put('/',orderedlistsController.update);
//localhost:3000/api/orderedlist
router.post('/', orderedlistsController.add);
//localhost:3000/api/orderedlist/49
router.delete('/:id', orderedlistsController.delete);
//post "CheckTime" TODO
router.post('/orderedlistsTime', orderedlistsController.checkTime);
//localhost:3000/api/orderedlist/48
router.get('/:id', orderedlistsController.getByOlid);


module.exports = router;