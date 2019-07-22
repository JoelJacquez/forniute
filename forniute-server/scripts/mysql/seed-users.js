const bcrypt = require('bcrypt');
const chalk = require('chalk');
const MysqlLib = require('../../lib/mysql');
const usersMocks = require('../../utils/mocks/users');

async function hasUsers(mysqlDB) {
  const users = await mysqlDB.queryManual(`select * from users`, {});

  return users && users.length;
}

async function createUser(mysqlDB, user) {
  user.password = await bcrypt.hash(user.password, 10);
  const sql = `INSERT INTO users (name, email, password)
  VALUES ('${user.name}','${user.email}', '${user.password}')`;
  const result = await mysqlDB.queryManual(sql);
  return result.insertId;
}

async function seedUsers() {
  try {
    const mysqlDB = new MysqlLib();

    if (await hasUsers(mysqlDB)) {
      console.log(chalk.yellow('Users already exists'));
      return process.exit(0);
    }

    for (let i = 0; i < usersMocks.length; i++) {
      const user = usersMocks[i];
      const userId = await createUser(mysqlDB, user);
      console.log(chalk.green('User created with id:', userId));
    }

    return process.exit(0);
  } catch (error) {
    console.log(chalk.red(error));
    process.exit(1);
  }
}

seedUsers();
