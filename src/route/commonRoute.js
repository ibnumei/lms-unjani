const express = require('express');

const router = express.Router();
const { fUserLogin } = require('../middleware/userLogin');
const { commonController } = require('../controller/index');

router.post('/common/insertUpdate', fUserLogin, commonController.insertUpdate);
router.post('/common/findOne', fUserLogin, commonController.findOne);
router.post('/common/findAll', fUserLogin, commonController.findAll);

module.exports = router;
