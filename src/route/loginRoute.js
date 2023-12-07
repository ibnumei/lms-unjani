const express = require('express');

const router = express.Router();
const { loginController } = require('../controller/index');
const { fUserLogin } = require('../middleware/userLogin');

router.post('/login', loginController.login);
router.post('/logout', fUserLogin, loginController.logout)
router.post('/login-admin', loginController.loginAdmin)
router.post('/check-login', loginController.checkLogin)
router.post('/register-admin', loginController.registerAdmin)

module.exports = router;
