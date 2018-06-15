var express = require('express');
var router = express.Router();

//Controllers
var usersController = require('../controllers/users');

/*
router.get('/', function (req, res) {
  res.send('API :: Hello World!');
});
*/
// --- Users API---//

//localhost:3000/api/users
router.get('/', usersController.list);
//localhost:3000/api/users/1
router.get('/:id', usersController.get);
//localhost:3000/api/users/role/Student
router.get('/role/:role', usersController.getByRole);
//localhost:3000/api/users
router.put('/', usersController.update);
//localhost:3000/api/users/url
router.put('/url', usersController.updateUrl);
//localhost:3000/api/users/credit
router.put('/credit', usersController.updateCredit);
//localhost:3000/api/users/signup
router.post('/signup', usersController.signup);
//todo
router.post('/signupemployee', usersController.signupEmployee);
//localhost:3000/api/users/login
router.post('/login', usersController.login);
//localhost:3000/api/users/11
router.delete('/:id', usersController.delete);


module.exports = router;