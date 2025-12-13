/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  // eslint-disable-next-line consistent-return
  async findOne(id) {
    try {
      const [user] = await this.database.query(
        "select * from user where id = ? ",
        [id],
      );
      return user;
    } catch (error) {
      console.error(error);
    }
  }

  findAll() {
    return this.database.query(`select * from  ${this.table}`);
  }

  // eslint-disable-next-line consistent-return
  async addOne(user) {
    try {
      const { user_name, email, password } = user;

      const [result] = await this.database.query(
        "insert into user (user_name, email, password, cart_id) values (?,?,?,?)",
        [user_name, email, password, null],
      );
      const userId = result.insertId;
      const cart = await this.createCartForUser(userId);
      await this.updateUserCart(userId, cart.id); // mettre à jour la table user avec l'ID du panier
      return { id: userId, user_name, email, cart_id: cart.id };
    } catch (error) {
      console.error("Erreur lors de la création", error);
    }
  }

  // eslint-disable-next-line consistent-return
  async createCartForUser(userId) {
    try {
      const [result] = await this.database.query(
        "insert into cart (user_id) values (?)",
        [userId],
      );
      const cartId = result.insertId;
      console.info("Cart Created");
      return { id: cartId, user_id: userId };
    } catch (error) {
      console.error("Erreur lors de la création du panier", error);
    }
  }

  async updateUserCart(userId, cartId) {
    try {
      await this.database.query("update user set cart_id = ? where id = ?", [
        cartId,
        userId,
      ]);
      console.info("User cart updated", { id: userId, cart_id: cartId });
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour du panier de l'utilisateur",
        error,
      );
    }
  }

  // eslint-disable-next-line consistent-return
  async findByEmail(email) {
    try {
      const [user] = await this.database.query(
        "select * from user where email = ? ",
        [email],
      );
      return user;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = UserManager;
