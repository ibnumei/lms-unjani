const { diagramService } = require('../service/index');
const { logError } = require('../util/ServerTool');

class DiagramController {
    static async pieChart(req, res) {
      try {
        const { year, month } = req.query;
        const data = await diagramService.pieChart(year, month);
        res.json({ success: true, data });
      } catch (ex) {
        logError('DiagramController.pieChart', ex);
        res.json({ success: false, message: 'Fail to get pieChart', ex });
      }
    }

    static async lineChartDouble(req, res) {
        try {
          const { year } = req.query;
          const data = await diagramService.lineChartDouble(year);
          res.json({ success: true, data });
        } catch (ex) {
          logError('DiagramController.lineChartDouble', ex);
          res.json({ success: false, message: 'Fail to get lineChartDouble', ex });
        }
      }
}
module.exports = DiagramController;
  