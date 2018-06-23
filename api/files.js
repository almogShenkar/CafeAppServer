const express = require('express');
let router = express.Router();

//Controllers
const filesController = require('../controllers/files');



//Files
//Notice 'url' in db = 'filename' e.g flower.jpg

//example: localhost:3000/api/upload/items-drinks
//make sure to remove header request: "Content-Type : application/x-www-form-urlencoded"
router.post('/upload/:imgtype/',filesController.upload);

//example: localhost:3000/api/download/items-drinks/bird.jpg
router.get('/download/:imgtype/:filename',filesController.download);

module.exports = router;