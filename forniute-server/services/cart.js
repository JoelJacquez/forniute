const MysqlLib = require('../lib/mysql');
class CartService {
  constructor() {
    this.mysqlDB = new MysqlLib();
  }

  async getCart({ userId }) {
    // const products = await this.mongoDB.getAll(this.collection, query);
    let [cart] = await this.mysqlDB.query(
      'select * from carts where owner = ? limit 1',
      [userId]
    );
    console.log('====================================');
    console.log('Cart result ', cart);
    console.log('====================================');
    if (cart) {
      const items = await this.mysqlDB.query( 'select * from cartItems where cartId = ?', [cart.id] );
      cart.cartItems = items;
      return cart;
    } else {
      const sql = 'INSERT INTO carts (owner) VALUES (?)';
      const resutl = await this.mysqlDB.query(sql, [userId]);
      cart = { id: resutl.insertId, cartItems: [] };
      return cart;
    }
  }
}

module.exports = CartService;
