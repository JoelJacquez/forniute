const chalk = require('chalk');
const MysqlLib = require('../../lib/mysql');
const productsMocks = require('../../utils/mocks/products');





async function hasProducts(mysqlDB) {
  const products = await mysqlDB.queryManual('select * from products', {});
  
  return products && products.length;
}

async function createProduct(mysqlDB, item) {
  const sql =`INSERT INTO products (name, description, urlPhoto, price)
  VALUES ('${item.name}','${item.description}', '${item.urlPhoto}', ${item.price})`
  console.log('====================================');
  console.log(chalk.yellow('sql ', sql));
  console.log('====================================');
  const productId = await mysqlDB.queryManual(sql);
  return productId;
}

async function seedProducts() {
  try {
    const mysqlDB = new MysqlLib();

    if (await hasProducts(mysqlDB)) {
      console.log(chalk.yellow('Products already exists'));
      return process.exit(0);
    }

    for (let i = 0; i < productsMocks.length; i++) {
      const item = productsMocks[i];
      const productId = await createProduct(mysqlDB, item);
      console.log(chalk.green('Product created with id:', productId));
    }

    return process.exit(0);
  } catch (error) {
    console.log(chalk.red(error));
    process.exit(1);
  }
}

seedProducts();