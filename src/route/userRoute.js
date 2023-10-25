const express = require('express');

const router = express.Router();
const { userController, memberController } = require('../controller/index');
const { fUserLogin } = require('../middleware/userLogin');

router.get('/user/:id', fUserLogin, userController.getUser);
router.post('/user', userController.registerUser);

module.exports = router;
