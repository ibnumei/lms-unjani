const express = require('express');

const router = express.Router();
const { bookController } = require('../controller/index');
const { fUserLogin } = require('../middleware/userLogin');

/* GET users listing. */
// router.get('/book', bookController.getBook);
// router.get('/book/:id', bookController.getSingleBook);
router.get('/book/syncBook', bookController.syncBook);

module.exports = router;
