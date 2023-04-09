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
        [id]
      );
      return user;
    } catch (error) {
      console.error(error);
    }
  }

  // eslint-disable-next-line consistent-return
  async addOne(user) {
    try {
      const { user_name, email, password } = user;
      console.info("Qqqqq", user);
      const [result] = await this.database.query(
        "insert into user (user_name, email, password) values (?,?,?)",
        [user_name, email, password]
      );
      return { id: result.insertId, user_name, email };
    } catch (error) {
      console.error("Erreur lors de la création", error);
    }
  }

  // eslint-disable-next-line consistent-return
  async findByEmail(email) {
    try {
      const [user] = await this.database.query(
        "select * from user where email = ? ",
        [email]
      );
      return user;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = UserManager;
