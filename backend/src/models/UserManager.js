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
      const { name, email, password } = user;
      const [result] = await this.database.query(
        "insert into user (name, email, password) values (?,?,?)",
        [name, email, password]
      );
      return { id: result.insertId, name, email };
    } catch (error) {
      console.info(error);
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
