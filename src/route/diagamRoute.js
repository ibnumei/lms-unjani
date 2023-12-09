const express = require('express');

const router = express.Router();
const { diagramController } = require('../controller/index');

// http://localhost:3000/lms-unjani/pie-chart?year=2023&month=10
// {
//     "success": true,
//     "data": {
//         "labels": ["Total Peminjaman","Total Kembali"],
//         "datasets": [
//             {
//                 "backgroundColor": ["#41B883","#E46651"],
//                 "data": [4,0]
//             }
//         ]
//     }
// }
router.get('/pie-chart', diagramController.pieChart);
// http://localhost:3000/lms-unjani/line-chart-double?year=2023
// {
//     "success": true,
//     "data": {
//         "staticMonth": ["Jan","Feb","Mar","Apr","Mei","Juni","Juli","Aug","Sep","Okt","Nov","Des"],
//         "totalPinjam": [0,0,0,0,0,0,0,0,0,4,8,0,0],
//         "totalKembali": [0,0,0,0,0,0,0,0,0,0,8,0,0]
//     }
// }
router.get('/line-chart-double', diagramController.lineChartDouble);

module.exports = router;
