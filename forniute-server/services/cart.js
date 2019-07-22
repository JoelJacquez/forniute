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
      const sql =
        'select ci.*, p.name, p.description, p.urlPhoto, p.price from cartItems as ci inner join products as p on ci.productId = p.id where ci.cartId = ?';
      const items = await this.mysqlDB.query(sql, [cart.id]);
      cart.cartItems = items;
      return cart;
    } else {
      const sql = 'INSERT INTO carts (owner) VALUES (?)';
      const resutl = await this.mysqlDB.query(sql, [userId]);
      cart = { id: resutl.insertId, cartItems: [] };
      return cart;
    }
  }

  async addItem({ userId, productId }) {
    let sql =
      'select * from cartItems where productId=? and cartId=(select id from carts where owner = ?) limit 1;';
    const [existingItem] = await this.mysqlDB.query(sql, [productId, userId]);
    console.log('existingItem ', existingItem);
    
    if (existingItem) {
      sql = 'update cartItems set quantity= quantity+1 where id = ?';
      const resultUpdate = await this.mysqlDB.query(sql, [existingItem.id]);
      console.log('result update ', resultUpdate);
      
      return existingItem.id;
    } else {
      sql =
        'insert into cartItems (cartId, productId, quantity ) values ((select id from carts where owner = ? limit 1), ?, 1);';
      let result = await this.mysqlDB.query(sql, [userId, productId]);
      return result.insertId;
    }
  }

  async deleteItem ({userId, itemId}){
    const sql = 'DELETE FROM cartItems where  cartId = (select id from carts where owner = ? limit 1) and id = ?';
    const result = await this.mysqlDB.query(sql, [userId, itemId]);
    return result;
  }
}

module.exports = CartService;
