/* eslint-disable no-shadow */
const fs = require("fs");
const multer = require("multer");
// const Joi = require("joi");
const models = require("../models");

const upload = multer({ dest: "uploads/" });

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
// const editbook = (req, res) => {
//   const bookId = parseInt(req.params.id, 10);
//   const book = req.body;

//   if (req.file) {
//     const { originalname, filename } = req.file;
//     book.image_book = `/public/uploads/${originalname}`;
//     fs.rename(
//       `./public/uploads/${filename}`,
//       `./public/uploads/${originalname}`,
//       (err) => {
//         if (err) {
//           console.error(err);
//           res.sendStatus(500);
//         } else {
//           // Insert record in images table
//           const image = {
//             book_id: bookId,
//             path: `/public/uploads/${originalname}`,
//           };
//           models.images.insert(image, (error, result) => {
//             if (error) {
//               console.error(error);
//               res.sendStatus(500);
//             } else {
//               console.info("Image added successfully:", result);
//               // Update the book's image ID with the newly created image's ID
//               const imageId = result.insertId;
//               book.image_id = imageId;
//               models.book.update(book, (error, result) => {
//                 if (error) {
//                   console.error(error);
//                   res.sendStatus(500);
//                 } else {
//                   console.info("Book updated successfully:", result);
//                   res.sendStatus(200);
//                 }
//               });
//             }
//           });
//         }
//       }
//     );
//   } else {
//     // No image uploaded, just update the book
//     models.books.update(book, (error, result) => {
//       if (error) {
//         console.error(error);
//         res.sendStatus(500);
//       } else {
//         console.info("Book updated successfully:", result);
//         res.sendStatus(200);
//       }
//     });
//   }
// };

// eslint-disable-next-line consistent-return
const addBook = (req, res) => {
  const book = req.body;
  if (!req.file) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  const { originalname, filename } = req.file;

  fs.rename(
    `./public/uploads/${filename}`,
    `./public/uploads/${originalname}`,
    (err) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        // Insert the book into the database
        models.book.insert(book).then(([result]) => {
          if (result.affectedRows === 0) {
            res.sendStatus(404);
          } else {
            // Insert the image into the database
            const image = {
              books_id: result.insertId,
              path: `/public/uploads/${originalname}`,
            };
            models.image.insert(image).then(([result]) => {
              if (result.affectedRows === 0) {
                res.sendStatus(404);
              } else {
                // Update the book's image ID with the newly created picture's ID
                const imageId = result.insertId;
                models.book.query(
                  "UPDATE books SET images_id = ? WHERE id = ?",
                  [imageId, result.insertId],
                  (error) => {
                    if (error) {
                      console.error(error);
                      res.sendStatus(500);
                    } else {
                      res.sendStatus(200);
                    }
                  }
                );
              }
            });
          }
        });
      }
    }
  );
};
// const add = (req, res) => {
//   const template = {
//     title: "",
//     publication_date: "",
//     genre: "",
//     pages: "",
//     images_id: "",
//     description: "",
//   };
//   const book = { ...template, ...req.body };

//   // Add the image information to the book object
//   if (req.file) {
//     book.images_id = req.file.filename;
//   }

//   // TODO validations (length, format...)

//   models.book.insert(book).then(([result]) => {
//     console.info("YYYYYYYYYYYYYY", result);
//     const newBook = { id: result.insertId, ...book };
//     res.status(201).json(newBook);
//   });
// };
const add = (req, res) => {
  const template = {
    title: "",
    publication_date: "",
    genre: "",
    pages: "",
    images_id: "",

    description: "",
  };
  const book = { ...template, ...req.body };

  // TODO validations (length, format...)

  models.book.insert(book).then(([result]) => {
    console.info("YYYYYYYYYYYYYY", result);
    const newBook = { id: result.insertId, ...book };
    if (res) {
      res.status(201).json(newBook);
    } else {
      console.error("Response object is undefined.");
    }
  });
};

const addWithImage = (req, res) => {
  // eslint-disable-next-line consistent-return
  upload.single("avatar")(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(400).json({ message: err.message });
    }

    console.info("HO", req.file); // to verify file object
    const { name_img: originalname } = req.body;

    console.info("WOW", req.body);
    // save image to database
    models.book.insert({}).then(([bookResult]) => {
      const bookId = bookResult.insertId;

      const image = {
        name: "name_img",
        url_img: `/uploads/${originalname}`,
        books_id: bookId,
      };
      console.info("TEST", image);
      models.image
        .insert(image)
        .then(([result]) => {
          const newImage = { id: result.insertId, ...image };
          const template = {
            url_img: `/uploads/${originalname}`,
            title: "",
            publication_date: "",
            genre: "",
            pages: "",
            images_id: newImage.id,
            description: "",
            books_id: bookId,
          };
          const book = { ...template, ...req.body };
          book.images_id = newImage.id;
          book.books_id = bookId;

          models.book.insert(book).then(([result]) => {
            console.info("YYYYYYYYYYYYYY", result);
            const newBook = { id: result.insertId, ...book };
            res.status(201).json(newBook);
          });
        })
        .catch((error) => {
          console.error(error);
          return res.status(500).json({ message: "Internal server error" });
        });
    });
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
  addWithImage,
  destroy,
  // readByGenre,
  readHasBooks,
  addBook,
};
