var express = require('express');
var router = express.Router();

//Controllers
var usersController = require('../controllers/users');


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
//localhost:3000/api/users/credit
router.get('/credit/:id',usersController.getCredit);
//localhost:3000/api/users/signup
router.post('/signup', usersController.signup);
//localhost:3000/api/users/emp
//router.post('/emp', usersController.signupEmployee);
//localhost:3000/api/users/emp/12
//router.get('/emp/:id', usersController.getEmployee);
//localhost:3000/api/users/emp
router.get('/emp', usersController.listEmployee);
//localhost:3000/api/users/login
router.post('/login', usersController.login);
//localhost:3000/api/users/11
router.delete('/:id', usersController.delete);
router.post('/sms/:olid',usersController.sendSms)


module.exports = router;