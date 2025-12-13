require('dotenv').config();

const express = require('express');
const fs = require('fs');
const cookieParser = require('cookie-parser');
// Ajout de multer
const multer = require('multer');

// const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');

const upload = multer({ dest: 'public/uploads' });

// Ajout de uuid
// const { v4: uuidv4 } = require("uuid");
// On définit la destination de stockage de nos fichiers
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10
});
const sendEmail = require('../sendEmail');

const router = express.Router();
const { authorization } = require('./middleware/auth'); // Modifie l'importation pour inclure uniquement le middleware authorization

// middleware cookieParser
router.use(cookieParser());

const itemControllers = require('./controllers/itemControllers');
const BooksControllers = require('./controllers/BooksControllers');
const CharactersControllers = require('./controllers/CharactersControllers');
const ImagesControllers = require('./controllers/ImagesControllers');
const CartControllers = require('./controllers/CartControllers');
const QuotesControllers = require('./controllers/QuotesControllers');

const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserControllers');
// const { verifyToken } = require("./helper/jwtHelper");

router.get('/items', itemControllers.browse);
router.get('/items/:id', itemControllers.read);
router.put('/items/:id', itemControllers.edit);
router.post('/items', itemControllers.add);
router.delete('/items/:id', itemControllers.destroy);

router.get('/user', authorization, UserController.browse);
// router.get("/user", authorization, (req, res) => {
// UserController.browse()
//   .then((user) => {
//     res.send(user);
//   })
//   .catch((err) => {
//     console.error(err);
//     res.sendStatus(500);
//   });

//   res.send(`Hello, ${req.userName}!`);
// });
router.get('/books', BooksControllers.browse);
// router.get("/books", verifyToken, BooksControllers.browse);

router.get('/books/:id', BooksControllers.read);

router.put('/books/:id', BooksControllers.edit);
router.post('/books', upload.single('avatar'), BooksControllers.addWithImage); // ok
// router.post("/books", upload.single("avatar"), BooksControllers.addBook); // ok
router.post('/avatar', upload.single('avatar'), (req, res) => {
  const { file } = req;

  // eslint-disable-next-line consistent-return
  fs.rename(file.path, `./public/uploads/${file.originalname}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error uploading image file');
    }

    console.info('File uploaded');

    const imageUrl = `http://localhost:5000/uploads/${file.originalname}`;
    const image = {
      name_img: file.originalname,
      url_img: imageUrl,
      books_id: req.body.books_id
    };
    // eslint-disable-next-line consistent-return
    pool.query('INSERT INTO images SET ?', image, (error, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error inserting image into database');
      }

      console.info(`Cool, Inserted image with id ${result.insertId}`);

      const responseData = {
        id: result.insertId,
        name: image.name_img,
        books_id: image.books_id,
        url: imageUrl
      };

      res.status(201).json(responseData);
    });
  });
});

// router.post("/books", BooksControllers.add);
router.delete('/books/:id', BooksControllers.destroy);
// router.get("/books/:id", authorization, (req, res) => {
//   // This route handler is only executed if the user is authenticated
//   res.send(`Hello, ${req.userName}!`);
// });
router.get('/bookshascharacters', BooksControllers.readHasBooks);
router.get('/characters', CharactersControllers.browse);
router.get('/characters/:id', CharactersControllers.read);
router.put('/characters/:id', CharactersControllers.edit);
router.post('/characters', CharactersControllers.add);
router.delete('/characters/:id', CharactersControllers.destroy);

router.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  // configurer le contenu de l'email de réponse automatique
  const replyMessage = {
    subject: "Nous vous remercions d'avoir pris contact avec nous!",
    text: `Bonjour ${name},\n\nNous vous remercions d'avoir pris contact avec nous. Nous avons bien reçu votre message, et nous vous répondrons dans les meilleurs délais.\n\nCordialement,\nVotre équipe`,
    html: `<p>Bonjour ${name},</p><p>Nous vous remercions d'avoir pris contact avec nous.<br> Nous avons bien reçu votre message, et nous vous répondrons dans les meilleurs délais.</p><p>Cordialement,<br>Notre équipe</p><p>Alexandre Dumas,<br> Métissage et Littérature🪶`
  };

  // configurer le contenu de l'email de notification pour vous-même
  const notifyMessage = {
    subject: 'New contact message',
    text: `You have received a new message from ${name} (${email}): ${message}`,
    html: `<p>You have received a new message from ${name} (${email}):</p><blockquote>${message}</blockquote>`
  };
  sendEmail.sendEmail(email, replyMessage);

  // envoyer l'email de notification
  sendEmail.sendEmail(process.env.NOTIFICATION_EMAIL, notifyMessage);

  res.sendStatus(200);
});

router.get('/images', ImagesControllers.browse);
router.get('/images/:id', ImagesControllers.read);
router.put('/images/:id', upload.single('avatar'), ImagesControllers.edit);
router.post('/images/', upload.single('avatar'), ImagesControllers.add); // ok
router.delete('/images/:id', ImagesControllers.destroy);

router.get('/hascart/:id', CartControllers.readHasCart);
router.put('/hascart/:id', CartControllers.editHasCart);
// router.post("/hascart", CartControllers.addHasCart);
router.post('/cart/:id/user/:id', CartControllers.addHasCart); //  permet d'ajouter des livres au panier
router.delete('/hascart/:id', CartControllers.emptyCart); //  pour vider le panier
router.get('/cart/:id', CartControllers.browse);
router.get('/cart/id', CartControllers.read);
router.get('/user/:id/cart_id/:id', CartControllers.readByUser); // Valide

router.delete('/user/:userId/cart_id/:cartId/book/:bookId', CartControllers.deleteInCart);
router.delete('/user/:userId/cart/:cartId', CartControllers.emptyCart);
router.put('/user/:userId/cart/:cartId', CartControllers.updateCart);
// router.get(
//   "/user/:id/cart_id/:cartId",
//   CartControllers.getAllBooksInCartByUser
// ); // route a modifier

router.get('/quotes', QuotesControllers.browse);
router.get('/quotes/:id', QuotesControllers.read);
router.put('/quotes/:id', QuotesControllers.edit);
router.post('/quotes', QuotesControllers.add);
router.delete('/quotes/:id', QuotesControllers.destroy);

router.post('/auth/login', AuthController.login);
// router.post("/auth/login", (req, res) => {
//   res.header("Authorization", `Bearer ${token}`).json({ token });
// });
// Route de login
// Route de login
router.post('/auth', (req, res) => {
  const { email } = req.body;

  // Vérifier les informations d'identification de l'utilisateur
  // TODO: Ajouter la vérification réelle de l'utilisateur en base de données

  // Définir le payload avec les informations de l'utilisateur
  const payload = {
    email
    // Ajoutez d'autres informations si nécessaire (userId, etc.)
  };

  // Si l'utilisateur est authentifié avec succès, générer un token
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: '24h'
  });

  // Envoyer le token dans la réponse
  res.json({ token });
});
router.get('/auth/logout', AuthController.logout);

// router.get("/user/:id/cart_id", UserController.getOne);

router.get('/user/:id', UserController.getById);
router.post('/user', UserController.createOne);
router.get('/user', UserController.browse);

// router.post("/auth", UserController.protection);
module.exports = router;
