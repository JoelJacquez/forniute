const chalk = require('chalk');
const MysqlLib = require('../../lib/mysql');

async function hasCarts(mysqlDB) {
  const users = await mysqlDB.queryManual(`select * from carts`, {});

  return users && users.length;
}

async function seedUsers() {
  try {
    const mysqlDB = new MysqlLib();

    if (await hasCarts(mysqlDB)) {
      console.log(chalk.yellow('Carts already exists'));
      return process.exit(0);
    }
    const sqlCreateCarts = 'insert into carts (id,owner) VALUES (1,2) ,(2,1)';
    const sqlCreatItemsCarts = 'insert into cartItems (id,productId,cartId,quantity) VALUES (1,3,1,2) ,(2,2,1,9) ,(3,1,2,1) ,(4,6,2,3) ,(5,7,2,1) ,(6,1,1,2)';

    await mysqlDB.queryManual(sqlCreateCarts);
    await mysqlDB.queryManual(sqlCreatItemsCarts);

    return process.exit(0);
  } catch (error) {
    console.log(chalk.red(error));
    process.exit(1);
  }
}

seedUsers();
