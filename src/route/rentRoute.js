const express = require('express');

const router = express.Router();
const { rentController } = require('../controller/index');
const { fUserLogin } = require('../middleware/userLogin');

/* GET users listing. */
// example pagination 
// http://localhost:3000/lms-unjani/rent-book?title=Psikologi Sosial, Jilid 2&itemCode=010117021000101
router.get('/rent-book', rentController.searchRentBook);
router.post('/rent-book', rentController.rentBook);

module.exports = router;
