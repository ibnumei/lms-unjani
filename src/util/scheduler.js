const _ = require('lodash');
const axios = require('axios');
const { sequelize, schedulerBean } = require('../db');
const {
  bookService: { syncBook },
  itemService: { syncItem },
  memberService: { syncMember }
} = require('../service');
const { schedulerStatus } = require('../util/Enums')

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
        scheduler = await schedulerBean.create({ type: 'BOOK', seq: Number(current_page), max: Number(total_pages) }, { transaction });
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
    }
  }

  static async syncItemScheduler() {
    const transaction = await sequelize.transaction();

    try {
      let scheduler = await schedulerBean.findOne({
        where: {
          type: 'ITEM',
        },
        transaction
      });

      if (!scheduler) {
        const { current_page, total_pages } = await Scheduler.getApiInfo('biblio');
        scheduler = await schedulerBean.create({
          type: 'ITEM',
          seq: Number(current_page),
          max: Number(total_pages)
        }, { transaction });
      }

      const { id, seq, max } = scheduler;
      if (!(seq <= max)) {
        await schedulerBean.destroy({ where: { id }, transaction })

        return transaction.commit()
      };

      const perpage = 10;

      let limitpage = Math.min(seq + perpage - 1, max);
      await syncItem(transaction, seq, limitpage);

      await schedulerBean.update({ seq: seq + perpage }, { where: { id }, transaction });

      const notes = `Sync item page ${seq}-${limitpage} /${max} ${parseFloat((seq / max) * 100).toFixed(2)}%`

      await transaction.commit();
      console.log('=====================================================================')
      console.log(`>>>>>>>>>>>>>>>>>>> ${notes} >>>>>>>>>>>>>>>>>>>>>`);
      console.log('=====================================================================')

      setTimeout(() => {
        return Scheduler.syncItemScheduler();
      }, 5000)
    } catch (error) {
      console.log(error);
      await transaction.rollback();
    }
  }

  static async syncMemberScheduler() {
    const transaction = await sequelize.transaction();
    let scheduler
    try {
      const { total_pages, total_rows } = await Scheduler.getApiInfo('member');

      scheduler = await schedulerBean.findOne({
        where: {
          type: 'MEMBER',
        },
        transaction
      });

      if (scheduler && scheduler.totalRows < total_rows) {
        await schedulerBean.update({
          max: Number(total_pages),
          totalRows: total_rows,
          status: schedulerStatus.INPROGRESS
        }, {
          where: { id: scheduler.id },
          transaction
        })
      }

      if (!scheduler) {
        scheduler = await schedulerBean.create({
          type: 'MEMBER',
          seq: Number(total_pages),
          max: Number(total_pages),
          totalRows: total_rows,
          status: schedulerStatus.INPROGRESS
        }, { transaction });
      }

      const { id, seq, max } = scheduler;
      if (!(seq <= max)) {
        await schedulerBean.update({
          seq: max,
          status: schedulerStatus.DONE
        }, {
          where: { id },
          transaction
        })

        return transaction.commit()
      };

      const perpage = 100;

      let limitpage = Math.min(seq + perpage - 1, max);
      await syncMember(transaction, seq, limitpage);

      await schedulerBean.update({ seq: seq + perpage }, { where: { id }, transaction });

      const notes = `Sync member page ${seq}-${limitpage} /${max} ${parseFloat((seq / max) * 100).toFixed(2)}%`

      await transaction.commit();
      console.log('=====================================================================')
      console.log(`>>>>>>>>>>>>>>>>>>> ${notes} >>>>>>>>>>>>>>>>>>>>>`);
      console.log('=====================================================================')

      setTimeout(() => {
        return Scheduler.syncMemberScheduler();
      }, 5000)
    } catch (error) {
      console.log(error);
      if (scheduler) {
        await scheduler.update({
          status: schedulerStatus.FAILED
        })
      }
      await transaction.rollback();
    }
  }

  static async getApiInfo(type) {
    const DELTA_LIBRARY_API = process.env.DELTA_LIBRARY_API;
    const DELTA_LIBRARY_SECRET = process.env.DELTA_LIBRARY_SECRET;

    const info = await axios.get(`${DELTA_LIBRARY_API}/${type}/1/${DELTA_LIBRARY_SECRET}`);

    return _.get(info, 'data');
  }
}

module.exports = Scheduler;