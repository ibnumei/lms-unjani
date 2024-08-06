const express = require('express');

const router = express.Router();
const { bannerController } = require('../controller/index');
const { fUserLogin } = require('../middleware/userLogin');


router.post('/banner/upload', fUserLogin, bannerController.uploadBanner);
router.get('/banner', bannerController.getBanner);

module.exports = router;
