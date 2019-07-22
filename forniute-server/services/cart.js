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

  async deleteItem({ userId, itemId }) {
    const sql =
      'delete from cartItems where  cartId = (select id from carts where owner = ? limit 1) and id = ?';
    const result = await this.mysqlDB.query(sql, [userId, itemId]);
    return result;
  }

  async subtractQuantityItem({ userId, itemId }) {
    const sqlConsultItem =
      'select quantity from cartItems where cartId = (select id from carts where owner = ?) and id = ? limit 1';
    const [resultConsultItem] = await this.mysqlDB.query(sqlConsultItem, [
      userId,
      itemId
    ]);

    if (resultConsultItem) {
      if (resultConsultItem.quantity > 1) {
        const sqlUpdate =
          'update cartItems set quantity = quantity - 1 where id = ?';
        const resultUpdate = await this.mysqlDB.query(sqlUpdate, [itemId]);
        return resultUpdate;
      } else {
        const sqlDelete = 'delete from cartItems where id = ?';
        const resultDelete = await this.mysqlDB.query(sqlDelete, [itemId]);
        return resultDelete;
      }
    } else {
      return { affectedRows: 0 };
    }
  }
  
  async checkout({ userId }) {
    const sql =
      'delete from cartItems where  cartId = (select id from carts where owner = ? limit 1)';
    const result = await this.mysqlDB.query(sql, [userId]);
    return result;
  }

}

module.exports = CartService;
