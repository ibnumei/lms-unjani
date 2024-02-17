const { bookBean, itemBean, authorBean, rentBean, memberBean, sequelize } = require('../db/index');
const {bulkInsertUpdate} = require('../util/ServerTool');
const { Sequelize } = require('../db');
const { Op } = require('sequelize');

class RentDao {
  static searchRentBook(whereBook, whereItems, transaction) {
    return bookBean.findOne({ 
      where: whereBook ,
      include: [
        {
            model: authorBean,
            as: 'authors'
        },
        {
          model: itemBean,
          as: 'items',
          where: whereItems
        }
      ],
      transaction
    });
  }

  static rentBook(newPayload, transaction) {
    const attributes = ['id', 'kode_pinjam', 'id_member', 'id_book', 'item_code', 'tgl_pinjam', 'status_pinjam', 'createdBy'];
      return bulkInsertUpdate(rentBean, newPayload, attributes, transaction)
  }

  static searchItems(itemsCode, transaction) {
    return itemBean.findAll({
      where: {  
        item_code: {
          [Op.in]: itemsCode
        }
      },
      transaction
    })
  }

  static updateItems(status, item_code, transaction) {
    return itemBean.update(
      { status },
      {
        where: {
          item_code
        },
      },
      transaction
    )
  }

  static searchRentData(where, transaction, attributes) {
    return rentBean.findAll({ 
      where ,
      raw: true,
      attributes,
      transaction
    });
  }

  static returnBook(kode_pinjam, member_name, transaction) {
    return rentBean.update(
      { status_pinjam: false, modifiedBy: member_name, tgl_kembali: new Date() },
      {
        where: {
          kode_pinjam
        },
      },
      transaction
    )
  }

  static async getListTransaction(where) {
    console.log(where)
    const rawQuery = `
    select
      rent.id,
      rent.kode_pinjam,
      rent.id_member,
      rent.id_book,
      rent.id_item_stock,
      rent.tgl_pinjam,
      rent.tgl_kembali,
      rent.status_pinjam,
      rent.location_order,
      member.member_name,
      book.title
    from db_rent rent
    inner join db_member member on member.id = rent.id_member
    inner join db_book book on book.id_book = rent.id_book
    LIMIT ${where.offset}, ${where.limit}`
    const result  =  await sequelize.query(rawQuery, {
      type: Sequelize.QueryTypes.SELECT
    })
    return result

    // return rentBean.findAndCountAll({ 
    //   limit: where.limit,
    //   offset: where.offset,
    //   include: [
    //     {
    //         model: memberBean,
    //         as: 'user'
    //     }
    //   ],
    // });
  }

  static async getReportTransaction(year) {
    const rawQuery = `
    SELECT
          months.month AS Bulan,
          count(rent.id) AS total_pinjam,
          CAST(COALESCE(SUM(CASE WHEN rent.status_pinjam = 0 THEN 1 ELSE 0 END), 0) AS SIGNED)  AS total_pengembalian
      FROM (
          SELECT 'Jan' AS month
          UNION SELECT 'Feb' AS month
          UNION SELECT 'Mar' AS month
          UNION SELECT 'Apr' AS month
          UNION SELECT 'May' AS month
          UNION SELECT 'Jun' AS month
          UNION SELECT 'Jul' AS month
          UNION SELECT 'Aug' AS month
          UNION SELECT 'Sep' AS month
          UNION SELECT 'Oct' AS month
          UNION SELECT 'Nov' AS month
          UNION SELECT 'Dec' AS month
      ) AS months
      LEFT JOIN (
          SELECT *
          FROM db_rent
           where  YEAR(db_rent.tgl_pinjam) = ${year}
      ) rent ON DATE_FORMAT(rent.tgl_pinjam, '%b') = months.month 
        GROUP BY months.month
    `
    const result  =  await sequelize.query(rawQuery, {
      type: Sequelize.QueryTypes.SELECT
    })
    return result
  }
}

module.exports = RentDao;
