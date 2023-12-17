const express = require('express');

const router = express.Router();
const { userController, memberController } = require('../controller/index');
const { fUserLogin } = require('../middleware/userLogin');

router.get('/user/:id', fUserLogin, userController.getUser);
router.post('/user', userController.registerUser);
router.put('/user-admin', fUserLogin, userController.updateUserAdmin);
router.post('/user/set-bebas-pustaka', userController.setBebasPustaka);

module.exports = router;
