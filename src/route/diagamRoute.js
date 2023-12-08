const express = require('express');

const router = express.Router();
const { diagramController } = require('../controller/index');

// http://localhost:3000/lms-unjani/pie-chart?year=2023&month=10
router.get('/pie-chart', diagramController.pieChart);
// http://localhost:3000/lms-unjani/line-chart-double?year=2023
router.get('/line-chart-double', diagramController.lineChartDouble);

module.exports = router;
