/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class CartManager extends AbstractManager {
  constructor() {
    super({ table: "cart" });
  }

  find(id) {
    return this.database.query(`select * from  ${this.table} where id = ?`, [
      id,
    ]);
  }

  // createCartUser(cart) {
  //   return this.database
  //     .query(`insert into ${this.table} (user_id, book_id) values (?, ?)`, [
  //       cart.user_id,
  //       cart.book_id,
  //     ])
  //     .then((result) => {
  //       const cart_id = result.insertId;
  //       return this.insertHasCart({
  //         cart_id,
  //         book_id: cart.book_id,
  //         user_id: cart.user_id,
  //       });
  //     });
  // }
  createCartUser(cart) {
    return this.database
      .query(`insert into ${this.table} (user_id, book_id) values (?, ?)`, [
        cart.user_id,
        cart.book_id,
      ])
      .then((result) => {
        // eslint-disable-next-line no-use-before-define
        const cart_id = cart_id;
        return this.insertHasCart({ cart_id, book_id: cart.book_id });
      });
  }

  insertHasCart(cart) {
    return this.database.query(
      `INSERT INTO cart_has_books (cart_id, book_id) VALUES (?, ?);`,
      [cart.cart_id, cart.book_id]
    );
  }

  findOneHasCart(id) {
    return this.database.query(
      `SELECT hb.cart_id, hb.book_id, u.id, c.id
      FROM cart_has_books AS hb 
      JOIN cart AS c ON hb.cart_id = c.id
      JOIN user AS u ON u.id = c.user_id
      WHERE hb.id_cart_has_books = ?
       `,
      [id]
    );
  }

  // findCartByUser(id) {
  //   return this.database.query(
  //     `SELECT c.id, hb.book_id, hb.id_cart_has_books, b.title, b.images_id, i.url_img
  //     FROM cart_has_books AS hb
  //     left join books as b on hb.book_id = b.id
  //     left join images as i on i.books_id = b.id
  //     JOIN cart AS c ON hb.id_cart_has_books = c.id
  //     WHERE   user_id = ?`,
  //     [id]
  //   );
  // }

  // pour tester

  findCartByUser(user_id, id) {
    return this.database.query(
      `SELECT hb.cart_id, hb.book_id, GROUP_CONCAT(DISTINCT b.title ORDER BY b.title SEPARATOR ',') as titles, GROUP_CONCAT(DISTINCT i.url_img ORDER BY b.title SEPARATOR ',') as images
      FROM cart_has_books AS hb
      LEFT JOIN books AS b ON hb.book_id = b.id
      LEFT JOIN images AS i ON i.books_id = b.id
      WHERE hb.cart_id = ?
      GROUP BY hb.book_id
      `,
      [user_id, id]
    );
  }

  findAll() {
    return this.database.query(`select * from  ${this.table}`);
  }

  delete(id) {
    return this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }

  deleteItemsByUser(userId) {
    return this.database.query(`DELETE FROM ${this.table} WHERE user_id = ? `, [
      userId,
    ]);
  }

  setDatabase(database) {
    this.database = database;
  }

  update(cart) {
    return this.database.query(
      `update ${this.table} set user_id = ? where id = ?`,
      [cart.user_id, cart.id]
    );
  }
}

module.exports = CartManager;
