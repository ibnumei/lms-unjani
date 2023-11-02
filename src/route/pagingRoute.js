const express = require('express');

const router = express.Router();
const { fUserLogin } = require('../middleware/userLogin');
const { pagingController } = require('../controller/index');

// Pagination / Popup
router.get('/paging/picker', pagingController.getPicker);
router.post('/paging/fetch', pagingController.getPaging);
router.post('/paging/report', fUserLogin, pagingController.getReport);

// Popup
router.post('/paging/fetchOne', fUserLogin, pagingController.getPopupOne);

// Dropdown
router.post('/paging/dropdown', fUserLogin, pagingController.getDropdown);
router.post('/paging/dropdownData', fUserLogin, pagingController.getDropdownData);

module.exports = router;
