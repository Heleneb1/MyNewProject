/* eslint-disable consistent-return */
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

const readHasBooks = (req, res) => {
  models.book
    .findAllBooksHasCharacters()
    .then(([rows]) => {
      res.send(rows);
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
const createImage = async (originalname) => {
  const existingImage = await originalname;
  if (existingImage) {
    return existingImage.id;
  }
};
const addWithImage = async (req, res) => {
  const { name_img: originalname } = req.body;
  console.info("RAAAAA", req.body);
  try {
    // eslint-disable-next-line no-unused-vars
    const existingImageId = await createImage(originalname);
    console.info("JJJJJJJJJ", existingImageId);
    const template = {
      title: "",
      publication_date: "",
      genre: "",
      pages: "",
      images_id: "",
      description: "",
    };
    console.info("NOOOOOO", template);
    const bookWithTemplate = { ...template, ...req.body };
    const [bookResult] = await models.book.insert(bookWithTemplate);
    const newBookId = bookResult.insertId;
    console.info("Alors", newBookId);

    const newBook = { id: bookResult.insertId, ...bookWithTemplate };
    console.info("new", newBook);
    await models.image.update(
      { books_id: newBookId },
      { where: { id: newBook.images_id } }
    );
    console.info("TTTTTTTTT", newBook.images_id);
    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  browse,
  read,
  edit,
  addWithImage,
  createImage,
  destroy,
  readHasBooks,
};
