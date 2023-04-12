const fs = require("fs");
const models = require("../models");

const browse = (req, res) => {
  models.image
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.image
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

// const edit = (req, res) => {
//   const image = req.body;

//   // TODO validations (length, format...)

//   image.id = parseInt(req.params.id, 10);

//   models.image
//     .update(image)
//     .then(([result]) => {
//       if (result.affectedRows === 0) {
//         res.sendStatus(404);
//       } else {
//         res.sendStatus(204);
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// };

// const add = (req, res) => {
//   const image = req.body;

//   // TODO validations (length, format...)

//   models.image
//     .insert(image)
//     .then(([result]) => {
//       res.location(`/images/${result.insertId}`).sendStatus(201);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// };
const edit = (req, res) => {
  const image = req.body;
  const { originalname } = req.file;
  const { filename } = req.file;

  // TODO validations (length, format...)

  image.id = parseInt(req.params.id, 10);
  fs.rename(
    `./public/uploads/${filename}`,
    `./public/uploads/${originalname}`,
    (err) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        models.image
          .update(image)
          .then(([result]) => {
            if (result.affectedRows === 0) {
              res.sendStatus(404);
            } else {
              res.sendStatus(204);
            }
          })
          // eslint-disable-next-line no-shadow
          .catch((err) => {
            console.error(err);
            res.sendStatus(500);
          });
      }
    }
  );
  image.url_img = `/public/uploads/${originalname}`;
  image.name_img = `${originalname}`;
};

const add = (req, res) => {
  const image = {
    name_img: req.body.name_img,
    url_img: `/public/uploads/${req.file.originalname}`,
    books_id: req.body.books_id,
  };

  // TODO validations (length, format...)

  fs.rename(
    `./public/uploads/${req.file.filename}`,
    `./public/uploads/${req.file.originalname}`,
    (err) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        models.images
          .insert(image)
          .then(([result]) => {
            if (result.affectedRows === 0) {
              res.sendStatus(404);
            } else {
              res.sendStatus(204);
            }
          })
          // eslint-disable-next-line no-shadow
          .catch((err) => {
            console.error(err);
            res.sendStatus(500);
          });
      }
    }
  );
};

const destroy = (req, res) => {
  models.image
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
};
