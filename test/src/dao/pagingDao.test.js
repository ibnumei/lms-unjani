const { when } = require('jest-when');
const pagingDao = require('../../../src/dao/pagingDao');
const { Sequelize, sequelize } = require('../../../src/db/index');
const { dropdowns, popups } = require('../../../src/util/Picker');

jest.mock('../../../src/db/index');
jest.mock('../../../src/util/Picker', () => ({
  pagings: {
    pagingPicker: {
      columns: [{
        id: 'id1', title: 'title id1', sortable: true, align: 'left', type: 'String', width: 200, column: 'column1', components: 'component'
      }],
      filters: [
        { id: 'id1', column: 'column1' }
      ],
      report: {},
      count: 'select count query',
      select: 'select query',
      orderby: 'id1 desc',
      search: 'column1'
    }
  },
  popups: {
    popupPicker: {
      columns: [{
        id: 'id1', title: 'title id1', sortable: true, align: 'left', type: 'String', width: 200, components: 'component', column: 'column1'
      }],
      filters: [
        { id: 'id1', column: 'column1', selectOne: true }
      ],
      select: 'select query'
    }
  },
  dropdowns: {
    dropdownPicker: {
      selectAll: 'select all query',
      filters: [
        { id: 'id1', column: 'column1' },
        { id: 'id2', column: 'column2' },
        { id: 'id3', column: 'column3' }
      ],
      primaryKey: 'primaryKey',
      selectOne: 'select one query'
    }
  }
}));

let actualResult;
let body;
let expectedWhere;
let expectedResult;
const columns = [{
  id: 'id1', title: 'title id1', sortable: true, align: 'left', type: 'String', width: 200, components: 'component'
}];

describe('.PagingDao', () => {
  describe('#getPicker', () => {
    it('should return paging columns when the picker is in paging', async () => {
      actualResult = await pagingDao.getPicker('pagingPicker');

      expect(actualResult).toEqual(columns);
    });

    it('should return paging columns when the picker is in popups', async () => {
      actualResult = await pagingDao.getPicker('popupPicker');

      expect(actualResult).toEqual(columns);
    });

    it('should return null when it is not paging or popups', async () => {
      actualResult = await pagingDao.getPicker('wrongpopups');

      expect(actualResult).toEqual([]);
    });
  });

  describe('#getReport', () => {
    it('should call sequelize query with params', async () => {
      body = {
        picker: 'pagingPicker'
      };

      await pagingDao.getReport(body);

      expect(sequelize.query).toHaveBeenCalledWith({}, { type: Sequelize.QueryTypes.SELECT });
    });
  });

  describe('#getDropdown', () => {
    it('should call sequelize query without where condition when the params has no filters', async () => {
      body = {
        picker: 'dropdownPicker'
      };

      await pagingDao.getDropdown(body);

      expect(sequelize.query).toHaveBeenCalledWith(dropdowns.dropdownPicker.selectAll, { type: Sequelize.QueryTypes.SELECT });
    });
    it('should call sequelize query  where condition when the params has  filters', async () => {
      expectedWhere = "select all query where  column1 = 'column1' and date(column2) = date('column2') and column3 = column3";
      body = {
        picker: 'dropdownPicker',
        filters: [
          {
            id: 'id1', value: 'column1', opr: 'EQUAL', type: 'STRING'
          },
          {
            id: 'id2', value: 'column2', opr: 'EQUAL', type: 'DATE'
          },
          {
            id: 'id3', value: 'column3', opr: 'EQUAL', type: 'NUMBER'
          }
        ]
      };

      await pagingDao.getDropdown(body);

      expect(sequelize.query).toHaveBeenCalledWith(expectedWhere, { type: Sequelize.QueryTypes.SELECT });
    });
  });

  describe('#getDropdownData', () => {
    const expectedQuery = 'select one query where primaryKey = primaryKey';
    it('should return null when sequelize.query return no data', async () => {
      body = {
        picker: 'dropdownPicker',
        primaryKey: 'primaryKey'
      };
      sequelize.query.mockResolvedValue([]);

      actualResult = await pagingDao.getDropdownData(body);

      expect(sequelize.query).toHaveBeenCalledWith(expectedQuery, { type: Sequelize.QueryTypes.SELECT });
      expect(actualResult).toBe(null);
    });
    it('should return the data', async () => {
      expectedResult = 1;
      body = {
        picker: 'dropdownPicker',
        primaryKey: 'primaryKey'
      };
      sequelize.query.mockResolvedValue([expectedResult]);

      actualResult = await pagingDao.getDropdownData(body);

      expect(sequelize.query).toHaveBeenCalledWith(expectedQuery, { type: Sequelize.QueryTypes.SELECT });
      expect(actualResult).toBe(expectedResult);
    });
  });

  describe('#constractWhereStatement', () => {
    it('should return "" when the body param has no filters', () => {
      actualResult = pagingDao.constractWhereStatement({}, {});

      expect(actualResult).toBe('');
    });
    it('should return result as expected (EQUAL in STRING, DATE, NUMBER)', () => {
      expectedWhere = "where  column1 = 'column1' and date(column2) = date('column2') and column3 = column3";
      body = {
        picker: 'dropdownPicker',
        filters: [
          {
            id: 'id1', value: 'column1', opr: 'EQUAL', type: 'STRING'
          },
          {
            id: 'id2', value: 'column2', opr: 'EQUAL', type: 'DATE'
          },
          {
            id: 'id3', value: 'column3', opr: 'EQUAL', type: 'NUMBER'
          }
        ]
      };
      actualResult = pagingDao.constractWhereStatement(body, dropdowns.dropdownPicker);

      expect(actualResult).toBe(expectedWhere);
    });
    it('should return result as expected (LIKE, GREATER in date and number)', () => {
      expectedWhere = "where  column1 like '%column1%' and date(column2) > date('column2') and column3 > column3";
      body = {
        picker: 'dropdownPicker',
        filters: [
          {
            id: 'id1', value: 'column1', opr: 'LIKE', type: 'STRING'
          },
          {
            id: 'id2', value: 'column2', opr: 'GEATER', type: 'DATE'
          },
          {
            id: 'id3', value: 'column3', opr: 'GEATER', type: 'NUMBER'
          }
        ]
      };

      actualResult = pagingDao.constractWhereStatement(body, dropdowns.dropdownPicker);

      expect(actualResult).toBe(expectedWhere);
    });
    it('should return result as expected ( GEATERTHEN in date and number)', () => {
      expectedWhere = "where  column1 >= column1 and date(column2) >= date('column2')";
      body = {
        picker: 'dropdownPicker',
        filters: [
          {
            id: 'id1', value: 'column1', opr: 'GEATERTHEN', type: 'NUMBER'
          },
          {
            id: 'id2', value: 'column2', opr: 'GEATERTHEN', type: 'DATE'
          }
        ]
      };

      actualResult = pagingDao.constractWhereStatement(body, dropdowns.dropdownPicker);

      expect(actualResult).toBe(expectedWhere);
    });
    it('should return result as expected ( LESS in date and number)', () => {
      expectedWhere = "where  column1 < column1 and date(column2) < date('column2')";
      body = {
        picker: 'dropdownPicker',
        filters: [
          {
            id: 'id1', value: 'column1', opr: 'LESS', type: 'NUMBER'
          },
          {
            id: 'id2', value: 'column2', opr: 'LESS', type: 'DATE'
          }
        ]
      };

      actualResult = pagingDao.constractWhereStatement(body, dropdowns.dropdownPicker);

      expect(actualResult).toBe(expectedWhere);
    });
    it('should return result as expected ( LESSTHEN in date and number)', () => {
      expectedWhere = "where  column1 <= column1 and date(column2) <= date('column2')";
      body = {
        picker: 'dropdownPicker',
        filters: [
          {
            id: 'id1', value: 'column1', opr: 'LESSTHEN', type: 'NUMBER'
          },
          {
            id: 'id2', value: 'column2', opr: 'LESSTHEN', type: 'DATE'
          }
        ]
      };

      actualResult = pagingDao.constractWhereStatement(body, dropdowns.dropdownPicker);

      expect(actualResult).toBe(expectedWhere);
    });
    it('should return result as expected ( IN and NOTIN for ARRAY)', () => {
      expectedWhere = 'where  column1 in (column1) and column2 not in (column2)';
      body = {
        picker: 'dropdownPicker',
        filters: [
          {
            id: 'id1', value: 'column1', opr: 'IN', type: 'ARRAY'
          },
          {
            id: 'id2', value: 'column2', opr: 'NOTIN', type: 'ARRAY'
          }
        ]
      };

      actualResult = pagingDao.constractWhereStatement(body, dropdowns.dropdownPicker);

      expect(actualResult).toBe(expectedWhere);
    });
  });

  describe('#getPaging', () => {
    let queryCount;
    let querySelect;
    const countQuery = [{
      count: 1
    }];
    const selectQuery = [
      {
        id1: 1,
        createdBy: 'undefined'
      }
    ];

    beforeEach(() => {
      expectedResult = {
        count: 1,
        rows: [
          {
            id1: 1,
            createdBy: ''
          }
        ]
      };
    });

    it('should return null on count and rows when the picker params is not a picker', async () => {
      body = {
        picker: 'notAPicker'
      };

      actualResult = await pagingDao.getPaging(body);

      expect(actualResult).toMatchObject({
        count: null,
        rows: null
      });
    });

    it('should return as expected (without search in body params)', async () => {
      queryCount = 'select count query ';
      querySelect = 'select query  order by column1 undefined LIMIT 5,5';
      body = {
        picker: 'pagingPicker',
        page: 1,
        pageSize: 5,
        orderColumn: 'id1'
      };
      when(sequelize.query)
        .calledWith(queryCount, { type: Sequelize.QueryTypes.SELECT })
        .mockResolvedValue(countQuery)
        .calledWith(querySelect, { type: Sequelize.QueryTypes.SELECT })
        .mockResolvedValue(selectQuery);

      actualResult = await pagingDao.getPaging(body);

      expect(actualResult).toMatchObject(expectedResult);
    });

    it('should return as expected  (with search in body params)', async () => {
      queryCount = 'select count query  where column1 like \'%search%\'';
      querySelect = 'select query  where column1 like \'%search%\' order by column1 undefined LIMIT 5,5';
      body = {
        picker: 'pagingPicker',
        page: 1,
        pageSize: 5,
        orderColumn: 'id1',
        search: 'search'
      };
      when(sequelize.query)
        .calledWith(queryCount, { type: Sequelize.QueryTypes.SELECT })
        .mockResolvedValue(countQuery)
        .calledWith(querySelect, { type: Sequelize.QueryTypes.SELECT })
        .mockResolvedValue(selectQuery);

      actualResult = await pagingDao.getPaging(body);

      expect(actualResult).toMatchObject(expectedResult);
    });

    it('should return as expected  (with search in body params and initial filter)', async () => {
      queryCount = 'select count query where  column1 = \'column1\' and column1 like \'%search%\'';
      querySelect = 'select query where  column1 = \'column1\' and column1 like \'%search%\' order by column1 undefined LIMIT 5,5';
      body = {
        picker: 'pagingPicker',
        page: 1,
        pageSize: 5,
        orderColumn: 'id1',
        search: 'search',
        filters: [
          {
            id: 'id1', value: 'column1', opr: 'EQUAL', type: 'STRING'
          }
        ]
      };
      when(sequelize.query)
        .calledWith(queryCount, { type: Sequelize.QueryTypes.SELECT })
        .mockResolvedValue(countQuery)
        .calledWith(querySelect, { type: Sequelize.QueryTypes.SELECT })
        .mockResolvedValue(selectQuery);

      actualResult = await pagingDao.getPaging(body);

      expect(actualResult).toMatchObject(expectedResult);
    });
  });

  describe('#getPopupOne', () => {
    beforeEach(() => {
      popups.popupPicker.filters[0].selectOne = true;
    });

    it('should throw error when picker filters has no selectOne property or false', async () => {
      expectedResult = new Error('Please define one selectOne on filters');
      popups.popupPicker.filters[0].selectOne = false;
      body = {
        code: 'code',
        picker: 'popupPicker'
      };

      actualResult = () => (
        pagingDao.getPopupOne(body)
      );

      await expect(actualResult()).rejects.toEqual(expectedResult);
    });
    it('should throw error when query result has no return value', async () => {
      expectedResult = new Error('Data tidak terdaftar');
      body = {
        code: 'code',
        picker: 'popupPicker'
      };
      sequelize.query.mockResolvedValue([]);

      actualResult = () => (
        pagingDao.getPopupOne(body)
      );

      await expect(actualResult()).rejects.toEqual(expectedResult);
    });
    it('should throw error when query result return more than one', async () => {
      expectedResult = new Error('Data terdaftar lebih dari 1');
      body = {
        code: 'code',
        picker: 'popupPicker'
      };
      sequelize.query.mockResolvedValue([{}, {}]);

      actualResult = () => (
        pagingDao.getPopupOne(body)
      );

      await expect(actualResult()).rejects.toEqual(expectedResult);
    });
    it('should return data as expected with no filters in body', async () => {
      expectedResult = {};
      body = {
        code: 'code',
        picker: 'popupPicker'
      };
      sequelize.query.mockResolvedValue([expectedResult]);

      actualResult = await pagingDao.getPopupOne(body);

      expect(actualResult).toMatchObject(expectedResult);
    });
    it('should return data as expected with filters in body', async () => {
      expectedResult = {};
      const querySelect = "select query where  column1 = 'column1' and column1 = 'code'";
      body = {
        code: 'code',
        picker: 'popupPicker',
        filters: [
          {
            id: 'id1', value: 'column1', opr: 'EQUAL', type: 'STRING'
          }
        ]
      };
      sequelize.query.mockResolvedValue([expectedResult]);

      actualResult = await pagingDao.getPopupOne(body);

      expect(sequelize.query).toHaveBeenCalledWith(querySelect, { type: Sequelize.QueryTypes.SELECT });
      expect(actualResult).toMatchObject(expectedResult);
    });
  });
});
