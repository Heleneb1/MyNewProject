const express = require("express");
const fs = require("fs");
const cookieParser = require("cookie-parser");
// Ajout de multer
const multer = require("multer");

// Ajout de uuid
// const { v4: uuidv4 } = require("uuid");
// On définit la destination de stockage de nos fichiers

const sendEmail = require("../sendEmail");

const router = express.Router();
// const { authorization } = require("./middleware/auth"); // Modifie l'importation pour inclure uniquement le middleware authorization

// middleware cookieParser
router.use(cookieParser());

const itemControllers = require("./controllers/itemControllers");
const BooksControllers = require("./controllers/BooksControllers");
const CharactersControllers = require("./controllers/CharactersControllers");
const ImagesControllers = require("./controllers/ImagesControllers");
const QuotesControllers = require("./controllers/QuotesControllers");
const AuthController = require("./controllers/authController");
const UserController = require("./controllers/UserControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

router.get("/books", BooksControllers.browse);
router.get("/books/:id", BooksControllers.read);
router.put("/books/:id", BooksControllers.edit);
router.post("/books", BooksControllers.add);
router.delete("/books/:id", BooksControllers.destroy);

router.get("/characters", CharactersControllers.browse);
router.get("/characters/:id", CharactersControllers.read);
router.put("/characters/:id", CharactersControllers.edit);
router.post("/characters", CharactersControllers.add);
router.delete("/characters/:id", CharactersControllers.destroy);

router.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  // configurer le contenu de l'email de réponse automatique
  const replyMessage = {
    subject: "Nous vous remercions d'avoir pris contact avec nous!",
    text: `Bonjour ${name},\n\nNous vous remercions d'avoir pris contact avec nous. Nous avons bien reçu votre message, et nous vous répondrons dans les meilleurs délais.\n\nCordialement,\nVotre équipe`,
    html: `<p>Bonjour ${name},</p><p>Nous vous remercions d'avoir pris contact avec nous. Nous avons bien reçu votre message, et nous vous répondrons dans les meilleurs délais.</p><p>Cordialement,<br>Votre équipe</p>`,
  };

  // configurer le contenu de l'email de notification pour vous-même
  const notifyMessage = {
    subject: "New contact message",
    text: `You have received a new message from ${name} (${email}): ${message}`,
    html: `<p>You have received a new message from ${name} (${email}):</p><blockquote>${message}</blockquote>`,
  };
  sendEmail.sendEmail(email, replyMessage);

  // envoyer l'email de notification
  sendEmail.sendEmail(process.env.NOTIFICATION_EMAIL, notifyMessage);

  res.sendStatus(200);
});

router.get("/images", ImagesControllers.browse);
router.get("/images/:id", ImagesControllers.read);
router.put("/images/:id", ImagesControllers.edit);
router.post("/images", ImagesControllers.add);
router.delete("/images/:id", ImagesControllers.destroy);
// On définit la destination de stockage de nos fichiers
const upload = multer({ dest: "public/uploads" });

// route POST pour recevoir un fichier
router.post("/avatar", upload.single("avatar"), (req, res) => {
  // On récupère le nom du fichier
  const { originalname } = req.file;

  // On récupère le nom du fichier
  const { filename } = req.file;

  // On utilise la fonction rename de fs pour renommer le fichier
  fs.rename(
    `./public/uploads/${filename}`,
    `./public/uploads/${originalname}`,
    // `./public/uploads/${uuidv4()}-${originalname}`,
    (err) => {
      if (err) throw err;
      res.send("File uploaded");
    }
  );
});
router.get("/quotes", QuotesControllers.browse);
router.get("/quotes/:id", QuotesControllers.read);
router.put("/quotes/:id", QuotesControllers.edit);
router.post("/quotes", QuotesControllers.add);
router.delete("/quotes/:id", QuotesControllers.destroy);

router.post("/auth/login", AuthController.login);
router.get("auth/logout", AuthController.logout);

router.get("/user/:id", UserController.getOne);
router.post("/user", UserController.createOne);
router.get("/user", UserController.browse);

module.exports = router;
