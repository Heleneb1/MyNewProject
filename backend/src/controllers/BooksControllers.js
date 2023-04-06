const models = require("../models");

const browse = (req, res) => {
  models.book
    .findAllBooks()
    .then(([rows]) => {
      const result = rows.map((book) => {
        return {
          ...book,

          images: book.images ? book.images.split(",") : [],
        };
      });
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// const readOne = (req, res) => {
//   models.book
//     .findOneBook()
//     .then(([rows]) => {
//       res.send(rows);
//       console.log("HHHHHHHHHHH", rows);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// };

const read = (req, res) => {
  models.book
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const book = req.body;

  // TODO validations (length, format...)

  book.id = parseInt(req.params.id, 10);

  models.book
    .update(book)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const template = {
    title: "",
    publication_date: "",
    genre: "",
    pages: "",
    images_id: null,
    description: "",
  };
  const book = { ...template, ...req.body };

  // TODO validations (length, format...)

  models.book.insert(book).then(([result]) => {
    console.info("YYYYYYYYYYYYYY", result);
    const newBook = { id: result.insertId, ...book };
    res.status(201).json(newBook);
  });
};

const destroy = (req, res) => {
  models.book
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  // readByGenre,
};
