const express = require('express');

const router = express.Router();
const { memberController } = require('../controller/index');
const { fUserLogin } = require('../middleware/userLogin');

/* GET users listing. */
// example pagination 
// http://localhost:3000/lms-unjani/member?page=1&size=10
router.get('/member', memberController.getMember);

module.exports = router;
