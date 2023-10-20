const { Sequelize } = require('../db/index');

class Query {
  constructor() {
    this.associations = [];
    this.wheres = [];
    this.orders = [];
    this.dao = null;
  }

  addAssociation(association) {
    this.associations.push(association);
    return this;
  }

  addOrder(order) {
    this.orders.push(order);
    return this;
  }

  addTarget(pdao, pattributes = []) {
    this.dao = pdao;
    this.attributes = pattributes;
    return this;
  }

  addWhere(where) {
    this.wheres.push(where);
    return this;
  }

  findAll(raw = false, t = null) {
    const query = {
      include: this.associations,
      where: this.wheres,
      order: this.orders,
      attributes: this.attributes,
      raw,
      transaction: t,
      tableHint: Sequelize.TableHints.NOLOCK
    };

    if (!this.attributes || this.attributes.length === 0) {
      delete query.attributes;
    }

    return this.dao.findAll(query);
  }

  findOne(raw = false, t = null) {
    const query = {
      include: this.associations,
      where: this.wheres,
      order: this.orders,
      attributes: this.attributes,
      raw,
      transaction: t,
      tableHint: Sequelize.TableHints.NOLOCK
    };

    if (!this.attributes || this.attributes.length === 0) {
      delete query.attributes;
    }

    return this.dao.findOne(query);
  }
}

module.exports = Query;

// Example
// const w = new Where()
// const where = w.or(
//     w.eq('NPWPNumber', '190208402'),
//     w.not('dataId', null),
// )

// const result = await QueryBuilder()
//     .addTarget(AppDetail)
//     .addAssociation({ association:AppDetailHasLegal, as:'appLegal', required:false, where:{active:1}, attributes:['mkkId'] })
//     .addWhere(where)
//     .addOrder(['dataId', 'asc'])
//     .findOne();

// res.json(result)

// Testing with normal asosiation
// const localAss = { association:DlosAppMkk.hasManyDlosAppMkkMerge, as:'supermerge', required:false, attributes:['mkkId'] }
// const result = await QueryBuilder()
// .addTarget(DlosAppMkk, ['mkkId'])
// .addAssociation(localAss)
// // .addWhere(mywehre)
// .findAll()

// Testing dari many to One
// const mw = await WhereBuilder();
// const mywehre = mw.eq('mkkMergeId', 1);
// const result = await QueryBuilder()
// .addTarget(DlosAppMkkMerge)
// .addAssociation(DlosAppMkkMerge.belongsToDlosAppMkk)
// .addWhere(mywehre)
// .findAll()
