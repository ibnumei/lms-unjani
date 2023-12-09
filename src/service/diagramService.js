const { diagramDao } = require('../dao/index');
const { Sequelize } = require('../db/');
const { Op } = require('sequelize');

class DiagramService {  
    static async pieChart(year, month) {
        const valueYear = year !== null ? year : year.getFullYear();
        const valueMonth = month !== null ? month : month.getMonth();
        const whereTotalPinjam = {
            [Op.and]: [
                Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('tgl_pinjam')), '=', valueYear),
                Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('tgl_pinjam')), '=', valueMonth),
            ],
        }
        const totalPeminjaman = await diagramDao.getCountRent(whereTotalPinjam);

        const whereTotalKembali = {
            [Op.and]: [
                Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('tgl_pinjam')), '=', valueYear),
                Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('tgl_pinjam')), '=', valueMonth),
                { status_pinjam: 0 },
            ],
        }
        const totalKembali = await diagramDao.getCountRent(whereTotalKembali);
        const dataPieChart = {
            labels: ["Total Peminjaman",  "Total Kembali"],
            datasets: [
                {
                    backgroundColor: ["#41B883", "#E46651"],
                    data: [totalPeminjaman, totalKembali],
                }
            ]
        }
        return dataPieChart;
    }

    static async lineChartDouble(year) {
        const staticMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Juni', 'Juli', 'Aug', 'Sep', 'Okt', 'Nov', 'Des']
        let totalPinjam = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        let totalKembali = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        const valueYear = year !== null ? year : year.getFullYear();
        const result  = await diagramDao.getLineDouble(valueYear)
        result.forEach((value) => {
            let indexMonth = value.bulan - 1
            totalPinjam[indexMonth] = parseInt(value.total_peminjaman)
            totalKembali[indexMonth] = parseInt(value.total_pengembalian)
        })
        return {
            staticMonth,
            totalPinjam,
            totalKembali
        }
    }
}

module.exports = DiagramService;
