const AbstractManager = require('./AbstractManager');

class CharactersManager extends AbstractManager {
  constructor() {
    super({ table: 'quotes' });
  }

  insert(quote) {
    return this.database.query(
      `insert into ${this.table} (associated_books, text, associated_character) values (?,?,?)`,
      [quote.associated_books, quote.text, quote.associated_character]
    );
  }

  update(quote) {
    return this.database.query(
      `update ${this.table} set associated_books=?,text=?,  associated_character=?, where id = ?`,
      [quote.associated_books, quote.text, quote.associated_character, quote.id]
    );
  }
}

module.exports = CharactersManager;
