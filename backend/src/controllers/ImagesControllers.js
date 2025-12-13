const fs = require('fs');
const models = require('../models');

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

const edit = (req, res) => {
  const image = {
    id: parseInt(req.params.id, 10),
    books_id: req.body.books_id // récupérer la valeur de books_id depuis le corps de la requête
  };

  // TODO validations (length, format...)

  models.image
    .updateOne(image) // modifiez l'appel à la méthode update pour appeler updateOne
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

const editOne = (req, res) => {
  const image = req.body;
  const { originalname } = req.file;
  const { filename } = req.file;

  // TODO validations (length, format...)

  image.id = parseInt(req.params.id, 10);
  fs.rename(`./public/uploads/${filename}`, `./public/uploads/${originalname}`, (err) => {
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
  });
  image.url_img = `/public/uploads/${originalname}`;
  image.name_img = `${originalname}`;
};

const update = (req, res) => {
  const image = req.body;
  const { originalname } = req.file;
  const { filename } = req.file;

  // TODO validations (length, format...)

  image.id = parseInt(req.params.id, 10);
  fs.rename(`./public/uploads/${filename}`, `./public/uploads/${originalname}`, (err) => {
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
        .catch((errors) => {
          console.error(errors);
          res.sendStatus(500);
        });
    }
  });
  image.url_img = `/public/uploads/${originalname}`;
  image.name_img = `${originalname}`;
};

const add = (req, res) => {
  const image = {
    name_img: req.body.name_img,
    url_img: `/public/uploads/${req.file.originalname}`,
    books_id: req.body.books_id
  };
  console.info(image);
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
              const insertedId = result.insertId;
              const newImage = {
                id: insertedId,
                name_img: image.name_img,
                url_img: image.url_img,
                books_id: image.books_id
              };
              res.status(201).json(newImage);
            }
          })
          // })
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
  editOne,
  add,
  destroy,
  update
};
