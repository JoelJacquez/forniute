const chalk = require('chalk');
const MongoLib = require('../../lib/mongo');
const productsMocks = require('../../utils/mocks/products')

async function hasProducts(mongoDB) {
  const products = await mongoDB.getAll('products', {});

  return products && products.length;
}

async function createProduct(mongoDB, item) {

  const productId = await mongoDB.create('products', item);
  return productId;
}

async function seedAdmin() {
  try {
    const mongoDB = new MongoLib();

    if (await hasProducts(mongoDB)) {
      console.log(chalk.yellow('Products already exists'));
      return process.exit(1);
    }

    for (let i = 0; i < productsMocks.length; i++) {
      const item = productsMocks[i];
      const productId = await createProduct(mongoDB, item);
      console.log(chalk.green('Product created with id:', productId));
    }

    return process.exit(0);
  } catch (error) {
    console.log(chalk.red(error));
    process.exit(1);
  }
}

seedAdmin();