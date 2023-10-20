/* eslint-disable class-methods-use-this */
const { Sequelize } = require('../db/index');

const { Op } = Sequelize;

class Where {
  constructor() {
    this.where = {};
  }

  // Grouping
  and(...subs) {
    const query = {};
    query[Op.and] = subs;
    return query;
  }

  or(...subs) {
    const query = {};
    query[Op.or] = subs;
    return query;
  }

  // Expression
  eq(column, value) { // w.eq('NPWPNumber', '190208402'),
    return this.exp(column, 'eq', value);
  }

  ne(column, value) {
    return this.exp(column, 'ne', value);
  }

  gte(column, value) {
    return this.exp(column, 'gte', value);
  }

  gt(column, value) {
    return this.exp(column, 'gt', value);
  }

  lte(column, value) {
    return this.exp(column, 'lte', value);
  }

  lt(column, value) {
    return this.exp(column, 'lt', value);
  }

  not(column, value) { // w.not('dataId', null),
    return this.exp(column, 'not', value);
  }

  is(column, value) {
    return this.exp(column, 'is', value);
  }

  in(column, value) {
    return this.exp(column, 'in', value);
  }

  notIn(column, value) {
    return this.exp(column, 'notIn', value);
  }

  like(column, value) {
    return this.exp(column, 'like', value);
  }

  notLike(column, value) {
    return this.exp(column, 'notLike', value);
  }

  iLike(column, value) {
    return this.exp(column, 'iLike', value);
  }

  notILike(column, value) {
    return this.exp(column, 'notILike', value);
  }

  startsWith(column, value) {
    return this.exp(column, 'startsWith', value);
  }

  endsWith(column, value) {
    return this.exp(column, 'endsWith', value);
  }

  substring(column, value) {
    return this.exp(column, 'substring', value);
  }

  regexp(column, value) {
    return this.exp(column, 'regexp', value);
  }

  notRegexp(column, value) {
    return this.exp(column, 'notRegexp', value);
  }

  iRegexp(column, value) {
    return this.exp(column, 'iRegexp', value);
  }

  notIRegexp(column, value) {
    return this.exp(column, 'notIRegexp', value);
  }

  between(column, value) {
    return this.exp(column, 'between', value);
  }

  notBetween(column, value) {
    return this.exp(column, 'notBetween', value);
  }

  overlap(column, value) {
    return this.exp(column, 'overlap', value);
  }

  contains(column, value) {
    return this.exp(column, 'contains', value);
  }

  contained(column, value) {
    return this.exp(column, 'contained', value);
  }

  adjacent(column, value) {
    return this.exp(column, 'adjacent', value);
  }

  strictLeft(column, value) {
    return this.exp(column, 'strictLeft', value);
  }

  strictRight(column, value) {
    return this.exp(column, 'strictRight', value);
  }

  noExtendRight(column, value) {
    return this.exp(column, 'noExtendRight', value);
  }

  noExtendLeft(column, value) {
    return this.exp(column, 'noExtendLeft', value);
  }

  any(column, value) {
    return this.exp(column, 'any', value);
  }

  all(column, value) {
    return this.exp(column, 'all', value);
  }

  col(column, opr, value) {
    return Sequelize.where(Sequelize.col(column), opr, value);

    // console.log('expression ', expression)
    // console.log('Object.keys(expression) ', Object.keys(expression).length)
    // Object.keys(expression).forEach(e=>{
    //   console.log('Keys ', e)
    // })
    // return Sequelize.where(Sequelize.col(column), expression)

    // const data = {
    //   'a': {[Op.eq] :'appLegal.NPWPNumber'}
    // }
    // const data = {
    //   [Op.col] : { 'appLegal.NPWPNumber' : {[Op.eq] : '123'}}
    // }

    // const data = {
    //   [Op.eq] : {[Op.col] : 'appLegal.NPWPNumber'}
    // }

    // const data = {
    //   {[Op.col] : 'appLegal.NPWPNumber'} : {[Op.eq] : '123'}}
    // }

    // return data;

    // const data = Sequelize.where(Op.eq(Sequelize.col('appLegal.NPWPNumber'), '123'))
    // console.log('data  >>>>> ', data);
    // return data;
    // const query = this.opr('col', column);
    // return query;
    // // const query = this.opr('col', column);
    // // query[Op.eq]  = 'ssss'
    // // return query;

    // // const obj = {}
    // // obj[Op.col] = "appLegal.NPWPNumber";
    // // obj[Op.eq] = "190208402";
    // // console.log('Haloooooooo ', obj)
    // // return [obj];

    // // const query = {}
    // // query[Op.col] = column
    // // //return query;
    // // const result = {}
    // // result[query] = expression;
    // // return result;
    // // {
    // //   [Op.col] = 'appLegal.NPWPNumber',
    // //   [P[]]
    // // }

    // // const obj = Sequelize.where(Sequelize.col('appLegal.NPWPNumber'), '123')
    // // console.log('obj ', obj)
    // // console.log('expression ', expression)
    // // return obj;

    // const aa = {[Op.col] : 'appLegal.NPWPNumber'}
    // const bb = {[Op.not] : '123'}

    // return [
    //   aa,
    //   bb
    // ]
  }

  placeholder(column, value) {
    return this.exp(column, 'placeholder', value);
  }

  join(column, value) {
    return this.exp(column, 'join', value);
  }

  exp(column, opr, value) {
    const query = {};
    query[column] = this.opr(opr, value);
    return query;
  }

  opr(opr, value) {
    return { [Op[opr]]: value };
  }

  getWhere() {
    return this.where;
  }
}

module.exports = Where;

// { eq: Symbol(eq), // Done
//   ne: Symbol(ne), // Done
//   gte: Symbol(gte), // Done
//   gt: Symbol(gt), // Done
//   lte: Symbol(lte), // Done
//   lt: Symbol(lt), // Done
//   not: Symbol(not), // Done
//   is: Symbol(is),  // Done
//   in: Symbol(in), // Done
//   notIn: Symbol(notIn), // Done
//   like: Symbol(like), //Done
//   notLike: Symbol(notLike), //Done
//   iLike: Symbol(iLike),  //Done MySql Not Supported
//   notILike: Symbol(notILike), // Done MySql Not Supported
//   startsWith: Symbol(startsWith), // Done
//   endsWith: Symbol(endsWith), // Done
//   substring: Symbol(substring), // Done
//   regexp: Symbol(regexp), // Done
//   notRegexp: Symbol(notRegexp), // Done
//   iRegexp: Symbol(iRegexp), // Done MySql Not Supported
//   notIRegexp: Symbol(notIRegexp), // Done MySql Not Supported
//   between: Symbol(between), // Done
//   notBetween: Symbol(notBetween), // Done
//   overlap: Symbol(overlap), // Done
//   contains: Symbol(contains), // Done MySql Not Supported
//   contained: Symbol(contained), // Done MySql Not Supported
//   adjacent: Symbol(adjacent),
//   strictLeft: Symbol(strictLeft),
//   strictRight: Symbol(strictRight),
//   noExtendRight: Symbol(noExtendRight),
//   noExtendLeft: Symbol(noExtendLeft),
//   and: Symbol(and), // Done
//   or: Symbol(or), // Done
//   any: Symbol(any),
//   all: Symbol(all),
//   values: Symbol(values),
//   col: Symbol(col),
//   placeholder: Symbol(placeholder),
//   join: Symbol(join) }

// Operators
// const Op = Sequelize.Op
// [Op.and]: [{a: 5}, {b: 6}] // (a = 5) AND (b = 6)
// [Op.or]: [{a: 5}, {a: 6}]  // (a = 5 OR a = 6)
// [Op.gt]: 6,                // > 6
// [Op.gte]: 6,               // >= 6
// [Op.lt]: 10,               // < 10
// [Op.lte]: 10,              // <= 10
// [Op.ne]: 20,               // != 20
// [Op.eq]: 3,                // = 3
// [Op.is]: null              // IS NULL
// [Op.not]: true,            // IS NOT TRUE
// [Op.between]: [6, 10],     // BETWEEN 6 AND 10
// [Op.notBetween]: [11, 15], // NOT BETWEEN 11 AND 15
// [Op.in]: [1, 2],           // IN [1, 2]
// [Op.notIn]: [1, 2],        // NOT IN [1, 2]
// [Op.like]: '%hat',         // LIKE '%hat'
// [Op.notLike]: '%hat'       // NOT LIKE '%hat'
// [Op.iLike]: '%hat'         // ILIKE '%hat' (case insensitive) (PG only)
// [Op.notILike]: '%hat'      // NOT ILIKE '%hat'  (PG only)
// [Op.startsWith]: 'hat'     // LIKE 'hat%'
// [Op.endsWith]: 'hat'       // LIKE '%hat'
// [Op.substring]: 'hat'      // LIKE '%hat%'
// [Op.regexp]: '^[h|a|t]'    // REGEXP/~ '^[h|a|t]' (MySQL/PG only)
// [Op.notRegexp]: '^[h|a|t]' // NOT REGEXP/!~ '^[h|a|t]' (MySQL/PG only)
// [Op.iRegexp]: '^[h|a|t]'    // ~* '^[h|a|t]' (PG only)
// [Op.notIRegexp]: '^[h|a|t]' // !~* '^[h|a|t]' (PG only)
// [Op.like]: { [Op.any]: ['cat', 'hat']}
//                            // LIKE ANY ARRAY['cat', 'hat'] - also works for iLike and notLike
// [Op.overlap]: [1, 2]       // && [1, 2] (PG array overlap operator)
// [Op.contains]: [1, 2]      // @> [1, 2] (PG array contains operator)
// [Op.contained]: [1, 2]     // <@ [1, 2] (PG array contained by operator)
// [Op.any]: [2,3]            // ANY ARRAY[2, 3]::INTEGER (PG only)
// [Op.col]: 'user.organization_id' // = "user"."organization_id", with dialect specific column identifiers, PG in this example
// [Op.gt]: { [Op.all]: literal('SELECT 1') }
//                           // > ALL (SELECT 1)

// Range Operator
// [Op.contains]: 2           // @> '2'::integer (PG range contains element operator)
// [Op.contains]: [1, 2]      // @> [1, 2) (PG range contains range operator)
// [Op.contained]: [1, 2]     // <@ [1, 2) (PG range is contained by operator)
// [Op.overlap]: [1, 2]       // && [1, 2) (PG range overlap (have points in common) operator)
// [Op.adjacent]: [1, 2]      // -|- [1, 2) (PG range is adjacent to operator)
// [Op.strictLeft]: [1, 2]    // << [1, 2) (PG range strictly left of operator)
// [Op.strictRight]: [1, 2]   // >> [1, 2) (PG range strictly right of operator)
// [Op.noExtendRight]: [1, 2] // &< [1, 2) (PG range does not extend to the right of operator)
// [Op.noExtendLeft]: [1, 2]  // &> [1, 2) (PG range does not extend to the left of operator)
