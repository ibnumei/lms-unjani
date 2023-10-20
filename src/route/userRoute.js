const express = require('express');

const router = express.Router();
const { userController } = require('../controller/index');
const { fUserLogin } = require('../middleware/userLogin');

/* GET users listing. */
router.get('/user/getUser/:userId', fUserLogin, userController.getUser);
router.post('/user', userController.registerUser);

module.exports = router;
