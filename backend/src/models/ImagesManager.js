const AbstractManager = require("./AbstractManager");

class ImagesManager extends AbstractManager {
  constructor() {
    super({ table: "images" });
  }

  insert(image) {
    return this.database.query(
      `insert into ${this.table} ( characters_id, books_id, name_img, url_img) values (?,?,?,?)`,
      [image.characters_id, image.books_id, image.name_img, image.url_img]
    );
  }

  updateOne(image) {
    return this.database.query(
      `UPDATE ${this.table} SET books_id = ? WHERE id = ?`,
      [image.books_id, image.id]
    );
  }

  update(image) {
    return this.database.query(
      `update ${this.table} set characters_id = ?, books_id= ?, name_img= ? ,  url_img=? where id = ?`,
      [
        image.characters_id,
        image.books_id,
        image.name_img,
        image.url_img,
        image.id,
      ]
    );
  }
}

module.exports = ImagesManager;
