const express = require('express');

const router = express.Router();
const { bookController } = require('../controller/index');
const { fUserLogin } = require('../middleware/userLogin');

/* GET users listing. */
router.get('/book', fUserLogin, bookController.getBook);
router.get('/book/:id', fUserLogin, bookController.getSingleBook);

module.exports = router;
