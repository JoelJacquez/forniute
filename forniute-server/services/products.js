const productMocks = require('../utils/mocks/products');
const MongoLib = require('../lib/mongo');

class ProductsService {
  constructor() {
    this.collection = 'products';
    this.mongoDB = new MongoLib();
  }

  async getProducts({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const products = await this.mongoDB.getAll(this.collection, query);
    return products || [];
  }

  async getProduct({ productId }) {
    return await this.mongoDB.get(this.collection, productId);
  }

  async createProduct({ product }) {
    const createProductId = await this.mongoDB.create(this.collection, product);
    console.log('====================================');
    console.log('createProductId ', createProductId);
    console.log('====================================');

    return createProductId;
  }

  async updateProduct({ productId, product }) {
    const updatedProductId = await this.mongoDB.update(this.collection, productId, product);

    return updatedProductId;
  }

  async deleteProduct({ productId }) {
    return await this.mongoDB.delete(this.collection, productId);
  }
}

module.exports = ProductsService;
