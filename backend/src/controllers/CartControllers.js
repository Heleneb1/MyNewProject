/* eslint-disable no-undef */
/* eslint-disable camelcase */
const models = require("../models");
// const { verifyToken } = require("../helper/jwtHelper");

const read = (req, res) => {
  models.cart
    .findOneHasCart(req.params.id)
    .then(([rows]) => {
      console.info(rows);
      if (rows[0] == null) {
        res.status(200).send([]);
      } else {
        res.send(rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const browse = (req, res) => {
  models.cart
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// Faire une combi des 2 codes pour un premier ajout au panier
// const readByUser = (req, res) => {
//   models.cart
//     .findCartByUser(req.params.id)

//     .then((cart) => {
//       if (!cart) {
//         res.sendStatus(404);
//       } else {
//         return cart.insertHasCart(req.params.bookId);
//       }
//     })
//     .then(() => {
//       res.sendStatus(200);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// };
const readByUser = (req, res) => {
  models.cart
    .findCartByUser(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
// const getAllBooksInCartByUser = (req, res) => {
//   models.cart
//     .findCartByUser(req.params.id, req.params.cartId)
//     .then(([rows]) => {
//       if (rows[0] == null) {
//         res.sendStatus(404);
//       } else {
//         res.send(rows);
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// };

const cartByUser = (req, res) => {
  models.cart.findCartByUser(user_id);
  const books = cart.map((item) => ({
    id: item.book_id,
    title: item.title,
    image: item.url_img,
  }));

  res.status(200).send(books);
};

// ** **********************Table de Jonction has_cart_books ********************/
const readHasCart = (req, res) => {
  models.cart
    .findOneHasCart(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const editHasCart = (req, res) => {
  const cart = req.body;

  // TODO validations (length, format...)

  cart.id = parseInt(req.params.id, 10);
  // console.info(cart)
  models.cart
    .updateHasCart(cart)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        // models.cart.findOneCart()

        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const addHasCart = async (req, res) => {
  const { user_id, book_id, cart_id } = req.body;
  try {
    await models.cart.insertHasCart({ cart_id, book_id });
    const cartItems = await models.cart.findCartByUser(user_id);
    res.status(201).send(cartItems);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const emptyCart = (req, res) => {
  models.cart
    // .findOneHasCart(req.params.id)
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

const destroyAllCart = (req, res) => {
  const { cartId } = req.params;
  const { bookId } = req.params;

  models
    .delete(cartId, bookId)
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
  readHasCart,
  editHasCart,
  addHasCart,
  emptyCart,
  readByUser,
  // getAllBooksInCartByUser,
  cartByUser,
  destroyAllCart,
};

// const readByUser = (req, res) => {
//   models.cart
//     .findCartByUser(req.params.id)
//     .then(([rows]) => {
//       if (rows[0] == null) {
//         // Insertion du panier pour l'utilisateur
//         return models.cart.createCartByUser(req.params.id);
//       } else {
//         // Retourne le panier existant pour l'utilisateur
//         res.send(rows);
//       }
//     })
//     .then((cart) => {
//       // Insertion de l'association entre le panier et le livre dans cart_has_books
//       return models.cart_has_books.insertHasCart(cart.cart_id, req.params.bookId);
//     })
//     .then(() => {
//       res.sendStatus(200);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// };
