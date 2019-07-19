const bcrypt = require("bcrypt");
const chalk = require("chalk");
const MysqlLib = require('../../lib/mysql');
const { config } = require("../../config");

function buildAdminUser(password) {
  return {
    password,
    username: config.authAdminUsername,
    email: config.authAdminEmail
  };
}

async function hasAdminUser(mysqlDB) {
  
  const adminUser = await mysqlDB.queryManual(`select * from users where email='${config.authAdminEmail}'`);

  return adminUser && adminUser.length;
}

async function createAdminUser(mysqlDB) {
  const hashedPassword = await bcrypt.hash(config.authAdminPassword, 10);
  const sql =`INSERT INTO users (name, email, password)
  VALUES ('${config.authAdminUsername}','${config.authAdminEmail}', '${hashedPassword}')`
  const result = await mysqlDB.queryManual(sql);
  return result.insertId;
}

async function seedAdmin() {
  try {
    const mysqlDB = new MysqlLib();
    mysqlDB.open();

    if (await hasAdminUser(mysqlDB)) {
      console.log(chalk.yellow("Admin user already exists"));
      return process.exit(1);
    }

    const adminUserId = await createAdminUser(mysqlDB);
    console.log(chalk.green("Admin user created with id:", adminUserId));
    console.log(adminUserId);
    
    return process.exit(0);
  } catch (error) {
    console.log(chalk.red(error));
    process.exit(1);
  }
}

seedAdmin();