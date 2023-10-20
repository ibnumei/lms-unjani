const Query = require('../../../src/util/Query');

describe('Query.test.js', () => {
  const query = new Query();

  test('addAssociation', async () => {
    await query.addAssociation({});
  });

  test('addOrder', async () => {
    await query.addOrder({});
  });

  test('addTarget', async () => {
    await query.addTarget(null, []);
    await query.addTarget(null);
  });

  test('addWhere', async () => {
    await query.addWhere({});
  });

  test('findAll (with attribute 0 length)', async () => {
    const dao = { findAll: jest.fn(() => {}) };
    await query.addTarget(dao, []).findAll();
  });

  test('findOne', async () => {
    const dao = { findOne: jest.fn(() => {}) };
    await query.addTarget(dao, []).findOne();
  });

  // Note :
  // Uncovered Line line  43,61
  // ini untuk kasus variable attribute undefined, biarkan saja ini gax mungkin terjadi
  // krn secara default bila tidak di set, maka attributes []
});
