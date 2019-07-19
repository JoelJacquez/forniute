
const MysqlLib = require('../../lib/mysql');
const productsMocks = require('../../utils/mocks/products')


async function  runTest() {
  console.log('====================================');
  console.log('Corrinte');
  console.log('====================================');
  const mysqlDB = new MysqlLib();
  const sql = 'select * from products';
  mysqlDB.open();
  const result =  await mysqlDB.queryManual(sql);
  const result2 =  await mysqlDB.queryManual(sql);
  mysqlDB.close();
  console.log('====================================');
  console.log(result);
  console.log(result2);
  console.log('====================================');
}

runTest();