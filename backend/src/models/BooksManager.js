/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class CharactersManager extends AbstractManager {
  constructor() {
    super({ table: "books" });
  }

  findAllBooks() {
    return this.database.query(
      `SELECT b.id, i.url_img, b.title, b.publication_date, b.genre, b.pages, b.description FROM books AS B LEFT JOIN images AS i ON i.books_id = b.id ORDER BY b.title ASC
      `
    );
  }

  findAllBooksHasCharacters() {
    return this.database.query(
      `SELECT c.name_characters, c.associated_book, c.description, b.genre,b.images_id from characters as c
      join books as b on b.id = c.id
      join books_has_characters as bhc on books_id=characters_id ORDER BY b.title ASC
      `
    );
  }

  findOneBook(id) {
    return this.database.query(
      `SELECT i.url_img,b.title, b.publication_date, b.genre, b.pages FROM books AS B JOIN images AS i ON i.books_id =b.id WHERE b.id = ?
      `,
      [id]
    );
  }

  insert(book) {
    return this.database.query(
      `insert into ${this.table} (title, publication_date, genre, pages,  description) values (?,?,?,?,?)`,
      [
        book.title,
        book.publication_date,
        book.genre,
        book.pages,
        book.description,
      ]
    );
  }

  // addOne(book) {
  //   const { title, publication_date, genre, pages, description } = book;
  //   return this.database
  //     .query(
  //       `INSERT INTO book ${this.table} (title, publication_date, genre, pages, description, images_id)
  //       VALUES (?, ?, ?, ?, ?, ?, ?)`[
  //         (title, publication_date, genre, pages, description, images_id)
  //       ]
  //     )
  //     .then(([result]) => {
  //       return { id: result.insertId, title };
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }
  addOne(book, images_id) {
    const { title, publication_date, genre, pages, description } = book;
    return this.database
      .query(
        `INSERT INTO book ${this.table} (title, publication_date, genre, pages, description, images_id) 
        VALUES (?, ?, ?, ?, ?, ?)`,
        [title, publication_date, genre, pages, description, images_id]
      )
      .then(([result]) => {
        return { id: result.insertId, title };
      })
      .catch((error) => {
        console.error(error);
      });
  }

  update(book) {
    return this.database.query(
      `update ${this.table} set title = ?, publication_date=?, genre=?, pages=?, images_id=?, description=? where id = ?`,
      [
        book.title,
        book.publication_date,
        book.genre,
        book.pages,
        book.images_id,
        book.description,
        book.id,
      ]
    );
  }

  // findAllByGenre(genre) {
  //   return this.database.query(`SELECT * FROM books WHERE genre = ?`, [genre]);
  // }
}

module.exports = CharactersManager;
