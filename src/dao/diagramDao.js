const { bookBean, itemBean, authorBean, rentBean } = require('../db/index');
const {bulkInsertUpdate} = require('../util/ServerTool');
const { Sequelize } = require('../db');
const { Op } = require('sequelize');

class DiagramDao {
    static getCountRent(where) {
        return rentBean.count({
          where,
          raw: true
        })
    }

    static getLineDouble(year)  {
        return rentBean.findAll({
            attributes: [
              [Sequelize.fn('YEAR', Sequelize.col('tgl_pinjam')), 'tahun'],
              [Sequelize.fn('MONTH', Sequelize.col('tgl_pinjam')), 'bulan'],
              [Sequelize.fn('COUNT', Sequelize.literal('*')), 'total_peminjaman'],
              [Sequelize.fn('SUM', Sequelize.literal('CASE WHEN status_pinjam = 0 THEN 1 ELSE 0 END')), 'total_pengembalian'],
            ],
            where: {
              [Op.and]: [
                Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('tgl_pinjam')), year),
              ],
            },
            group: ['tahun', 'bulan'],
            order: [
                [Sequelize.col('tahun'), 'ASC'],
                [Sequelize.col('bulan'), 'ASC'],
            ],
            raw: true
        });
    }
}

module.exports = DiagramDao;