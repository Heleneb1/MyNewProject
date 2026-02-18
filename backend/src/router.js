require('dotenv').config();

const express = require('express');
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const mysql = require('mysql2');
const path = require('path');
const crypto = require('crypto');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10
});

const sendEmail = require('../sendEmail');
const { authorization } = require('./middleware/auth');

const router = express.Router();

// Middleware cookieParser
router.use(cookieParser());

// Rate limiters
const contactLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 2,
  standardHeaders: true,
  legacyHeaders: false
});
const limiter = rateLimit({ windowMs: 60 * 1000, max: 5 });

// Multer upload
const upload = multer({ dest: 'public/uploads' });

// Controllers
const itemControllers = require('./controllers/itemControllers');
const BooksControllers = require('./controllers/BooksControllers');
const CharactersControllers = require('./controllers/CharactersControllers');
const ImagesControllers = require('./controllers/ImagesControllers');
const CartControllers = require('./controllers/CartControllers');
const QuotesControllers = require('./controllers/QuotesControllers');
const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserControllers');

// --------- ROUTES ---------

// Items
router.get('/items', itemControllers.browse);
router.get('/items/:id', itemControllers.read);
router.put('/items/:id', itemControllers.edit);
router.post('/items', itemControllers.add);
router.delete('/items/:id', itemControllers.destroy);

// Users
router.get('/user', authorization, UserController.browse);
router.get('/user/:id', UserController.getById);
router.post('/user', UserController.createOne);

// Books
router.get('/books', BooksControllers.browse);
router.get('/books/:id', BooksControllers.read);
router.put('/books/:id', BooksControllers.edit);
router.post('/books', limiter, upload.single('avatar'), BooksControllers.addWithImage);
router.delete('/books/:id', BooksControllers.destroy);
router.get('/bookshascharacters', BooksControllers.readHasBooks);

// Characters
router.get('/characters', CharactersControllers.browse);
router.get('/characters/:id', CharactersControllers.read);
router.put('/characters/:id', CharactersControllers.edit);
router.post('/characters', CharactersControllers.add);
router.delete('/characters/:id', CharactersControllers.destroy);

// Images
router.get('/images', ImagesControllers.browse);
router.get('/images/:id', ImagesControllers.read);
router.put('/images/:id', upload.single('avatar'), ImagesControllers.edit);
router.post('/images', upload.single('avatar'), ImagesControllers.add);
router.delete('/images/:id', ImagesControllers.destroy);

// Avatar upload route avec nom aléatoire
router.post('/avatar', limiter, upload.single('avatar'), (req, res) => {
  const { file } = req;
  if (!file) return res.status(400).send('No file uploaded');

  const ext = path.extname(file.originalname);
  const filename = crypto.randomUUID() + ext;

  fs.rename(file.path, `./public/uploads/${filename}`, (err) => {
    if (err) return res.status(500).send('Error uploading image file');

    const imageUrl = `http://localhost:5000/uploads/${filename}`;
    const image = {
      name_img: file.originalname,
      url_img: imageUrl,
      books_id: req.body.books_id
    };

    pool.query('INSERT INTO images SET ?', image, (error, result) => {
      if (error) return res.status(500).send('Error inserting image into database');

      res.status(201).json({
        id: result.insertId,
        name: image.name_img,
        books_id: image.books_id,
        url: imageUrl
      });
    });
  });
});

// Contact
router.post('/contact', contactLimiter, (req, res) => {
  const { name, email, subject, message, website } = req.body;
  if (website) return res.sendStatus(200);

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Tous les champs sont obligatoires' });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: 'Email invalide' });
  }
  if (message.length < 50) {
    return res.status(400).json({ error: 'Le message doit comporter au moins 50 caractères' });
  }

  const replyMessage = {
    subject: "Nous vous remercions d'avoir pris contact avec nous!",
    text: `Bonjour ${name},\n\nNous avons bien reçu votre message.\n\nCordialement,\nVotre équipe`,
    html: `<p>Bonjour ${name},</p><p>Nous avons bien reçu votre message et nous vous répondrons rapidement.</p>`
  };

  const notifyMessage = {
    subject: 'New contact message',
    text: `Message de ${name} (${email}): ${message}`,
    html: `<p>Message de ${name} (${email}):</p><blockquote>${message}</blockquote>`
  };

  sendEmail.sendEmail(email, replyMessage);
  sendEmail.sendEmail(process.env.NOTIFICATION_EMAIL, notifyMessage);

  res.sendStatus(200);
});

// Cart
router.get('/hascart/:id', CartControllers.readHasCart);
router.put('/hascart/:id', CartControllers.editHasCart);
router.post('/cart/:id/user/:id', CartControllers.addHasCart);
router.delete('/hascart/:id', CartControllers.emptyCart);
router.get('/cart/:id', CartControllers.browse);
router.get('/cart/id', CartControllers.read);
router.get('/user/:id/cart_id/:id', CartControllers.readByUser);
router.delete('/user/:userId/cart_id/:cartId/book/:bookId', CartControllers.deleteInCart);
router.delete('/user/:userId/cart/:cartId', CartControllers.emptyCart);
router.put('/user/:userId/cart/:cartId', CartControllers.updateCart);

// Quotes
router.get('/quotes', QuotesControllers.browse);
router.get('/quotes/:id', QuotesControllers.read);
router.put('/quotes/:id', QuotesControllers.edit);
router.post('/quotes', QuotesControllers.add);
router.delete('/quotes/:id', QuotesControllers.destroy);

// Auth
router.post('/auth/login', limiter, AuthController.login);
router.get('/auth/logout', AuthController.logout);

module.exports = router;
