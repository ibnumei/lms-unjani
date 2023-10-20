const Where = require('../../../src/util/Where');

describe('Where.test.js', () => {
  const where = new Where();

  test('and', async () => {
    await where.and(['a', 'b', 'c']);
  });

  test('or', async () => {
    await where.or(['a', 'b', 'c']);
  });

  test('eq', async () => {
    await where.eq('NPWPNumber', '190208402');
  });

  test('ne', async () => {
    await where.ne('NPWPNumber', '190208402');
  });

  test('gte', async () => {
    await where.gte('NPWPNumber', '190208402');
  });

  test('gt', async () => {
    await where.gt('NPWPNumber', '190208402');
  });

  test('lte', async () => {
    await where.lte('NPWPNumber', '190208402');
  });

  test('lt', async () => {
    await where.lt('NPWPNumber', '190208402');
  });

  test('not', async () => {
    await where.not('NPWPNumber', '190208402');
  });

  test('is', async () => {
    await where.is('NPWPNumber', '190208402');
  });

  test('in', async () => {
    await where.in('NPWPNumber', '190208402');
  });

  test('notIn', async () => {
    await where.notIn('NPWPNumber', '190208402');
  });

  test('like', async () => {
    await where.like('NPWPNumber', '190208402');
  });

  test('notLike', async () => {
    await where.notLike('NPWPNumber', '190208402');
  });

  test('iLike', async () => {
    await where.iLike('NPWPNumber', '190208402');
  });

  test('notILike', async () => {
    await where.notILike('NPWPNumber', '190208402');
  });

  test('startsWith', async () => {
    await where.startsWith('NPWPNumber', '190208402');
  });

  test('endsWith', async () => {
    await where.endsWith('NPWPNumber', '190208402');
  });

  test('substring', async () => {
    await where.substring('NPWPNumber', '190208402');
  });

  test('regexp', async () => {
    await where.regexp('NPWPNumber', '190208402');
  });

  test('notRegexp', async () => {
    await where.notRegexp('NPWPNumber', '190208402');
  });

  test('iRegexp', async () => {
    await where.iRegexp('NPWPNumber', '190208402');
  });

  test('notIRegexp', async () => {
    await where.notIRegexp('NPWPNumber', '190208402');
  });

  test('between', async () => {
    await where.between('NPWPNumber', '190208402');
  });

  test('notBetween', async () => {
    await where.notBetween('NPWPNumber', '190208402');
  });

  test('overlap', async () => {
    await where.overlap('NPWPNumber', '190208402');
  });

  test('contains', async () => {
    await where.contains('NPWPNumber', '190208402');
  });

  test('contained', async () => {
    await where.contained('NPWPNumber', '190208402');
  });

  test('adjacent', async () => {
    await where.adjacent('NPWPNumber', '190208402');
  });

  test('strictLeft', async () => {
    await where.strictLeft('NPWPNumber', '190208402');
  });

  test('strictRight', async () => {
    await where.strictRight('NPWPNumber', '190208402');
  });

  test('noExtendRight', async () => {
    await where.noExtendRight('NPWPNumber', '190208402');
  });

  test('noExtendLeft', async () => {
    await where.noExtendLeft('NPWPNumber', '190208402');
  });

  test('any', async () => {
    await where.any('NPWPNumber', '190208402');
  });

  test('all', async () => {
    await where.all('NPWPNumber', '190208402');
  });

  test('col', async () => {
    await where.col('NPWPNumber', '=', '190208402');
  });

  test('placeholder', async () => {
    await where.placeholder('NPWPNumber', '190208402');
  });

  test('join', async () => {
    await where.join('NPWPNumber', '190208402');
  });

  test('exp', async () => {
    await where.exp('NPWPNumber', '=', '190208402');
  });

  test('opr', async () => {
    await where.exp('=', '190208402');
  });

  test('getWhere', async () => {
    await where.getWhere();
  });
});
