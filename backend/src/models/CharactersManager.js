const AbstractManager = require("./AbstractManager");

class CharactersManager extends AbstractManager {
  constructor() {
    super({ table: "characters" });
  }

  insert(character) {
    return this.database.query(
      `insert into ${this.table} (name_characters, associated_book, description) values (?,?,?)`,
      [
        character.name_characters,
        character.associated_book,
        character.description,
      ],
    );
  }

  findOne(id) {
    return this.database.query(
      `SELECT name_characters ,title
      FROM characters AS c 
      JOIN books_has_characters AS bhc ON c.id = bhc.characters_id 
      join books as b on b.id =c.id
      WHERE bhc.books_id = ?`,
      [id],
    );
  }

  update(character) {
    return this.database.query(
      `update ${this.table} set title = ? id, name_characters=?, associated_book=?, description =? where id = ?`,
      [
        character.name_characters,
        character.associated_book,
        character.description,
        character.id,
      ],
    );
  }
}

module.exports = CharactersManager;
