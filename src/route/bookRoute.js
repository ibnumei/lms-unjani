const express = require('express');

const router = express.Router();
const { bookController } = require('../controller/index');
const { fUserLogin } = require('../middleware/userLogin');

/* GET users listing. */
// example pagination 
// http://localhost:3000/lms-unjani/book?page=1&size=10
// http://localhost:3000/lms-unjani/book?title=psikologi&page=1&size=10
router.get('/book', bookController.getBook);
router.get('/book/:id', bookController.getSingleBook);

module.exports = router;
