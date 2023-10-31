const express = require('express');

const router = express.Router();
const { rentController } = require('../controller/index');
const { fUserLogin } = require('../middleware/userLogin');

router.get('/search-rent-book', fUserLogin, rentController.searchRentBook);
router.post('/rent-book', fUserLogin, rentController.rentBook);

module.exports = router;
