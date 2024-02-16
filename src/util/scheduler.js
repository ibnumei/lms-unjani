const _ = require('lodash');
const axios = require('axios');
const { sequelize, schedulerBean, schedulerDetailBean } = require('../db/index');
const { syncBook } = require('../service/bookService')

class Scheduler {
  static async syncBookScheduler() {
    const transaction = await sequelize.transaction();
    try {
      let scheduler = await schedulerBean.findOne({
        where: {
          type: 'BOOK',
        },
        transaction
      });

      if (!scheduler) {
        const { current_page, total_pages } = await Scheduler.getApiInfo();
        scheduler = await schedulerBean.create({ type: 'BOOK', seq: Number(current_page), max: Number(total_pages) },{ transaction });
      }

      const { id, seq, max } = scheduler;
      if (!(seq <= max)) return;

      // perpage buat nentuin nanti mau fetch berapa halaman, per 1 halaman memuat sekitar 10 books, belum termasuk author & items
      const perpage = 5;
      
      let limitpage = Math.min(seq + perpage - 1, max);
      const { book } = await syncBook(transaction, seq, limitpage);
      if (!book || book.length == 0) {
        throw Error('No Book')
      }

      await schedulerBean.update({ seq: seq + perpage }, { where: { id }, transaction });
     
      const notes = `Sync Book page ${seq}-${limitpage} /${max} ${parseFloat((seq / max) * 100).toFixed(2)}%`
     
      // Buat tracing hasil scheduling, aktifin aja kalo mau liat lognya dari DB

      // await schedulerDetailBean.create({
      //   scheduler_id: id,
      //   notes,
      //   json: JSON.stringify(book)
      // }, { transaction });
      
      await transaction.commit();
      console.log('=====================================================================')
      console.log(`>>>>>>>>>>>>>>>>>>> ${notes} >>>>>>>>>>>>>>>>>>>>>`);
      console.log('=====================================================================')
      return scheduler;
    } catch (error) {
      await transaction.rollback();
      console.log(error);
    }
  }

  static async getApiInfo() {
    const DELTA_LIBRARY_API = process.env.DELTA_LIBRARY_API;
    const DELTA_LIBRARY_SECRET =  process.env.DELTA_LIBRARY_SECRET;

    const info = await axios.get(`${DELTA_LIBRARY_API}/biblio/1/${DELTA_LIBRARY_SECRET}`);

    return _.get(info, 'data');
  }
}

module.exports = Scheduler;