/* eslint-disable no-param-reassign */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-restricted-syntax */
const _ = require('lodash');
const { Sequelize, sequelize } = require('../db/index');
const { pagings, dropdowns, popups } = require('../util/Picker');

class PagingDao {
  static async getPicker(picker) {
    if (pagings[picker]) {
      return pagings[picker].columns.map((e) => (
        {
          id: e.id,
          title: e.title,
          align: e.align,
          type: e.type,
          width: e.width,
          sortable: e.sortable,
          components: e.components
        }
      ));
    }

    if (popups[picker]) {
      return popups[picker].columns.map((e) => (
        {
          id: e.id,
          title: e.title,
          align: e.align,
          type: e.type,
          width: e.width,
          sortable: e.sortable,
          components: e.components
        }
      ));
    }
    return [];
  }

  static async getReport(body) {
    const picker = pagings[body.picker];
    return sequelize.query(picker.report, { type: Sequelize.QueryTypes.SELECT });
  }

  static async getDropdown(body) {
    const picker = dropdowns[body.picker];

    let where = '';
    if (body.filters) {
      for (const filter of body.filters) {
        const pickerfilter = picker.filters.filter((e) => e.id === filter.id);
        if (pickerfilter.length > 0) { // Hanya boleh equal di dropdown
          if (filter.opr === 'EQUAL' && filter.type === 'STRING') where += ` and ${pickerfilter[0].column} = '${filter.value}'`;
          if (filter.opr === 'EQUAL' && filter.type === 'DATE') where += ` and date(${pickerfilter[0].column}) = date('${filter.value}')`;
          if (filter.opr === 'EQUAL' && filter.type === 'NUMBER') where += ` and ${pickerfilter[0].column} = ${filter.value}`;
        }
      }
    }

    if (where.startsWith(' and')) {
      where = ` where ${where.substring(4, where.length)}`;
    }

    let orderBy = !!picker.orderby ? ` ORDER BY ${picker.orderBy} ` : '';

    let groupBy = !!picker.groupBy ? ` GROUP BY ${picker.groupBy} ` : '';
    
    let limit = !!picker.limit ? ` LIMIT ${picker.limit} ` : '';

    let pickerSelect = picker.selectAll


    if (picker.custom) {
      const regexScope = new RegExp(`{where}`,'g')
      pickerSelect = pickerSelect.replace(regexScope, where)
      where = ''
    }

    const query = pickerSelect + where + ` ${groupBy} ${orderBy} ${limit}`;

    console.log(query)

    return sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });
  }

  static async getDropdownData(body) {
    const picker = dropdowns[body.picker];
    const query = `${picker.selectOne} where ${picker.primaryKey} = ${body.primaryKey}`;
    const datas = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });
    if (datas.length === 1) return datas[0];
    return null;
  }

  static async getPaging(body) {
    // Sample body
    // Picker > Nama picker yang ada di picker-config.js
    // Page > Nomor page yang di pilih di mulai dari angka 0
    // PageSize > Jumlah data dalam 1 page
    // OrderColumn > id yang akan di gunakan untuk ordering, lihat id di bagian columns
    // OrderDesc > untuk sorting
    // Search > Global Searching for all column
    // Filters > filtering list
    // Filters.id > id yang akan di gunakan untuk filtering, lihat id di bagian filters
    // Filters.value > Nilai yang digunakan untuk where
    // Filters.opr > Operator where (EQUAL, LIKE, GREATER, GEATERTHEN, LESS, LESSTHEN, IN, NOTIN)
    // Filters.type > Tipe data (STRING, NUMBER, ARRAY, DATE) blm semua di dukung
    // {
    //     "picker" : "pagingUser",
    //     "page": 0,
    //     "pageSize":20,
    //     "orderColumn":"user_id",
    //     "orderDir":"asc",
    //     "search":"J"
    //     "filters":[
    //         {"id": "name", "value":"dev", "opr":"LIKE", "type":"STRING"}
    //     ]
    // }

    // Get Picker Property
    let picker = null;
    let countValue = null;
    let selectQuery = null;
    if (pagings[body.picker]) picker = pagings[body.picker];
    if (popups[body.picker]) picker = popups[body.picker];
    if (picker) {
      // Constract Limit row
      const limitStart = body.page * body.pageSize;
      const limitEnd = body.pageSize;

      // Constract Where statement
      let where = this.constractWhereStatement(body, picker);

      // Constract Search
      const { search } = body;
      if (search && search.trim() !== '') {
        if (where === '') {
          where += ` where ${picker.search} like '%${search}%'`;
        } else {
          where += ` and ${picker.search} like '%${search}%'`;
        }
      }

      // Constract order by statement
      const column = picker.columns.filter((e) => e.id === body.orderColumn);
      let orderBy = picker.orderby;
      if (column.length > 0) {
        orderBy = `${column[0].column} ${body.orderDir}`;
      }

      const queryCount = `${picker.count} ${where}`;
      const querySelect = `${picker.select} ${where} order by ${orderBy} LIMIT ${limitStart},${limitEnd}`;
      const countQuery = await sequelize.query(queryCount, { type: Sequelize.QueryTypes.SELECT });
      selectQuery = await sequelize.query(querySelect, { type: Sequelize.QueryTypes.SELECT });

      const objectCountQuery = countQuery[0];
      const countKey = Object.keys(objectCountQuery)[0];
      countValue = objectCountQuery[countKey];

      selectQuery.forEach((obj) => {
        Object.keys(obj)
          .forEach((prop) => {
            if (obj[prop] === 'undefined') {
              obj[prop] = '';
            }
          });
      });
    }
    return {
      count: countValue,
      rows: selectQuery
    };
  }

  static async getPopupOne(body) {
    // Sample body
    // Picker > Nama picker yang ada di picker-config.js
    // Page > Nomor page yang di pilih di mulai dari angka 0
    // PageSize > Jumlah data dalam 1 page
    // OrderColumn > id yang akan di gunakan untuk ordering, lihat id di bagian columns
    // OrderDesc > untuk sorting
    // Search > Global Searching for all column
    // Filters > filtering list
    // Filters.id > id yang akan di gunakan untuk filtering, lihat id di bagian filters
    // Filters.value > Nilai yang digunakan untuk where
    // Filters.opr > Operator where (EQUAL, LIKE, GREATER, GEATERTHEN, LESS, LESSTHEN, IN, NOTIN)
    // Filters.type > Tipe data (STRING, NUMBER, ARRAY, DATE) blm semua di dukung
    // {
    //     "picker": "popupUser",
    //     "code": "elvino",
    //     "filters": [
    //         { "id": "code", "value": "01", "opr": "EQUAL", "type": "STRING" },
    //         { "id": "id", "value": "1", "opr": "EQUAL", "type": "STRING" }
    //     ]
    // }

    // Get Picker Property
    const picker = popups[body.picker];

    // Constract Where statement
    let where = this.constractWhereStatement(body, picker);

    // Constract Search
    const { code } = body;
    const codeFilter = picker.filters.find((e) => e.selectOne);
    if (!codeFilter) throw Error('Please define one selectOne on filters');
    if (where === '') {
      where += ` where ${codeFilter.column} = '${code}'`;
    } else {
      where += ` and ${codeFilter.column} = '${code}'`;
    }

    const querySelect = `${picker.select} ${where}`;

    const array = await sequelize.query(querySelect, { type: Sequelize.QueryTypes.SELECT });
    if (array.length === 0) throw Error('Data tidak terdaftar');
    if (array.length > 1) throw Error('Data terdaftar lebih dari 1');
    return { data: array[0] };
  }

  static constractWhereStatement(body, picker) {
    let where = '';
    if (body.filters) {
      for (const filter of body.filters) {
        const pickerfilter = picker.filters.filter((e) => e.id === filter.id);
        if (pickerfilter.length > 0) {
          if (filter.opr === 'EQUAL' && filter.type === 'STRING') where += ` and ${pickerfilter[0].column} = '${filter.value}'`;
          if (filter.opr === 'EQUAL' && filter.type === 'DATE') where += ` and date(${pickerfilter[0].column}) = date('${filter.value}')`;
          if (filter.opr === 'EQUAL' && filter.type === 'NUMBER') where += ` and ${pickerfilter[0].column} = ${filter.value}`;
          if (filter.opr === 'LIKE' && filter.type === 'STRING') where += ` and ${pickerfilter[0].column} like '%${filter.value}%'`;
          if (filter.opr === 'GEATER' && filter.type === 'NUMBER') where += ` and ${pickerfilter[0].column} > ${filter.value}`;
          if (filter.opr === 'GEATER' && filter.type === 'DATE') where += ` and date(${pickerfilter[0].column}) > date('${filter.value}')`;
          if (filter.opr === 'GEATERTHEN' && filter.type === 'NUMBER') where += ` and ${pickerfilter[0].column} >= ${filter.value}`;
          if (filter.opr === 'GEATERTHEN' && filter.type === 'DATE') where += ` and date(${pickerfilter[0].column}) >= date('${filter.value}')`;
          if (filter.opr === 'LESS' && filter.type === 'NUMBER') where += ` and ${pickerfilter[0].column} < ${filter.value}`;
          if (filter.opr === 'LESS' && filter.type === 'DATE') where += ` and date(${pickerfilter[0].column}) < date('${filter.value}')`;
          if (filter.opr === 'LESSTHEN' && filter.type === 'NUMBER') where += ` and ${pickerfilter[0].column} <= ${filter.value}`;
          if (filter.opr === 'LESSTHEN' && filter.type === 'DATE') where += ` and date(${pickerfilter[0].column}) <= date('${filter.value}')`;
          if (filter.opr === 'IN' && filter.type === 'ARRAY') where += ` and ${pickerfilter[0].column} in (${filter.value})`;
          if (filter.opr === 'NOTIN' && filter.type === 'ARRAY') where += ` and ${pickerfilter[0].column} not in (${filter.value})`;
        }
      }
    }

    if (where.startsWith(' and')) {
      where = `where ${where.substring(4, where.length)}`;
    }

    return where;
  }
}

module.exports = PagingDao;
