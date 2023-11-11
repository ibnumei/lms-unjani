const express = require('express');

const router = express.Router();
const { rentController } = require('../controller/index');
const { fUserLogin } = require('../middleware/userLogin');

router.post('/search-rent-book', fUserLogin, rentController.searchRentBook);
router.post('/rent-book', fUserLogin, rentController.rentBook);
router.put('/rent-book', fUserLogin, rentController.returnBook);
router.get('/search-return-book/:kodePinjam', fUserLogin, rentController.searchReturnBook);

module.exports = router;
