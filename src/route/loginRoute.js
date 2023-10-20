const express = require('express');

const router = express.Router();
const { loginController } = require('../controller/index');
const { fUserLogin } = require('../middleware/userLogin');

router.post('/login', loginController.login);

module.exports = router;
