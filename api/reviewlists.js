var express = require('express');
var router = express.Router();

//Controllers
var reviewlistsController = require('../controllers/reviewlists-controller');



// --- Reviewlists API---//
router.get('/reviewlists', reviewlistsController.list);
router.get('/reviewlists/:id', reviewlistsController.get);
router.get('/reviewlists/:userid/:orderid', reviewlistsController.getItemRevByUser);
router.put('/reviewlists',reviewlistsController.update);
router.post('/reviewlists', reviewlistsController.add);
router.delete('/reviewlists/:id', reviewlistsController.delete);

module.exports = router;