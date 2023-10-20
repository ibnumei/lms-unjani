const express = require('express');

const router = express.Router();
const { techController } = require('../controller/index');
const { fUserLogin } = require('../middleware/userLogin');

/* GET Test Enviroment. */
router.get('/tech/env', fUserLogin, techController.getEnv);

router.get('/tech/db', fUserLogin, techController.getUserDb);

router.get('/tech/time', fUserLogin, techController.getTime);

module.exports = router;
