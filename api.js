var express = require('express');
var router = express.Router();

//Controllers
var usersController = require('./controllers/users-controller');
var itemsController = require('./controllers/items-controller');
var ordereditemsController = require('./controllers/ordereditems-controller');
var orderedlistsController = require('./controllers/orderedlists-controller');
var reviewsController = require('./controllers/reviews-controller');
var reviewlistsController = require('./controllers/reviewlists-controller');
var employeesController = require('./controllers/employees-controller');
var shiftsController = require('./controllers/shifts-controller');
var suppliersController = require('./controllers/suppliers-controller');
var filesController = require('./controllers/files-controller');
var queriesController = require('./controllers/queries-controller');
var suppliersController = require('./controllers/suppliers-controller');


router.get('/', function (req, res) {
  res.send('API :: Hello World!');
});


// --- Users API---//

//localhost:3000/api/users
router.get('/users', usersController.list);
//localhost:3000/api/users/1
router.get('/users/:id', usersController.get);
//localhost:3000/api/users
router.put('/users', usersController.update);
//localhost:3000/api/users/url
router.put('/users/url', usersController.updateUrl);
//localhost:3000/api/users/credit
router.put('/users/credit', usersController.updateCredit);
//localhost:3000/api/users/signup
router.post('/users/signup', usersController.signup);
//todo
router.post('/users/signupemployee', usersController.signupEmployee);
//localhost:3000/api/users/login
router.post('/users/login', usersController.login);
//localhost:3000/api/users/11
router.delete('/users/:id', usersController.delete);

// --- Items API---//

//localhost:3000/api/items
router.get('/items', itemsController.list);
//localhost:3000/api/items/1
router.get('/items/:id', itemsController.get);
//localhost:3000/api/items/type/drink
router.get('/items/type/:type', itemsController.listByStatus);
//localhost:3000/api/items
router.put('/items',itemsController.update);
//localhost:3000/api/items
router.post('/items', itemsController.add);
//localhost:3000/api/items/27
router.delete('/items/:id', itemsController.delete);

// --- Ordereditems API---//

//localhost:3000/api/ordereditems
router.get('/ordereditems', ordereditemsController.list);
//localhost:3000/api/ordereditems/2
router.get('/ordereditems/:id', ordereditemsController.get);
//localhost:3000/api/ordereditems/olid/5
router.get('/ordereditems/olid/:id', ordereditemsController.listByOlid);
//localhost:3000/api/ordereditems
router.put('/ordereditems',ordereditemsController.update);
//localhost:3000/api/ordereditems
router.post('/ordereditems', ordereditemsController.add);
//localhost:3000/api/ordereditems/6
router.delete('/ordereditems/:id', ordereditemsController.delete);



// --- OrderedLists API---//

//localhost:3000/api/orderedlists
router.get('/orderedlists', orderedlistsController.list);
//localhost:3000/api/orderedlists/48
router.get('/orderedlists/:id', orderedlistsController.getByOlid);
//localhost:3000/api/orderedlists/userid/2
router.get('/orderedlists/userid/:id', orderedlistsController.listByUserid);
//localhost:3000/api/orderedlists/status/incoming
router.get('/orderedlists/status/:status', orderedlistsController.listByStatus);
//localhost:3000/api/orderedlists
router.put('/orderedlists',orderedlistsController.update);
//localhost:3000/api/orderedlists
router.post('/orderedlists', orderedlistsController.add);
//localhost:3000/api/orderedlists/49
router.delete('/orderedlists/:id', orderedlistsController.delete);


//post "CheckTime" TODO
router.post('/orderedlistsTime', orderedlistsController.checkTime);




// --- Reviews API---//
router.get('/reviews', reviewsController.list);
router.get('/reviews/:id', reviewsController.get);
router.put('/reviews',reviewsController.update);
router.post('/reviews', reviewsController.add);
router.delete('/reviews/:id', reviewsController.delete);

// --- Reviewlists API---//
router.get('/reviewlists', reviewlistsController.list);
router.get('/reviewlists/:id', reviewlistsController.get);
router.put('/reviewlists',reviewlistsController.update);
router.post('/reviewlists', reviewlistsController.add);
router.delete('/reviewlists/:id', reviewlistsController.delete);

// --- Shifts API---//
router.get('/shifts', shiftsController.list);
router.get('/shifts/:id', shiftsController.get);
router.put('/shifts',shiftsController.update);
router.post('/shifts', shiftsController.add);
router.delete('/shifts/:id', shiftsController.delete);

// --- Employees API---//

//localhost:3000/api/employees
router.get('/employees', employeesController.list);
//localhost:3000/api/employees/1
router.get('/employees/:id', employeesController.get);
//localhost:3000/api/employees
router.put('/employees',employeesController.update);
//localhost:3000/api/employees
router.post('/employees', employeesController.add);
//localhost:3000/api/employees/3
router.delete('/employees/:id', employeesController.delete);

// --- Supplier API---//

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

//Files
//Notice 'url' in db = 'filename' e.g flower.jpg

//example: localhost:3000/api/upload/items
//make sure to remove header request: "Content-Type : application/x-www-form-urlencoded"
router.post('/upload/:imgtype/',filesController.upload);

//example: localhost:3000/api/download/items/bird.jpg
router.get('/download/:imgtype/:filename',filesController.download);

//localhost:3000/api/query/monthworstitems
router.get('/query/:selectedquery',queriesController.run);

module.exports = router;