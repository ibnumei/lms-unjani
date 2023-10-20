const auditDao = require('./src/dao/auditDao');

const main = async () => {
  try {
    await auditDao.auditReqRes(5, 'AppIdAsignment', 'keternagan', { name: 'elvino', job: 'suami' }, { name: 'carinnia', job: 'istri' }, 'MyAudit', null);

    process.exit(1);
  } catch (e) {
    console.log('Error bro ', e);
    process.exit(1);
  }
};

main();
