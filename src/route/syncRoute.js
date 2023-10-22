const express = require('express');

const router = express.Router();
const { syncController } = require('../controller/index');

router.get('/sync/book', syncController.syncBook);
router.get('/sync/member', syncController.syncMember);

module.exports = router;