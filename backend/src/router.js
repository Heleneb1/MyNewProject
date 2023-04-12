const express = require("express");
const fs = require("fs");
const cookieParser = require("cookie-parser");
// Ajout de multer
const multer = require("multer");
const upload = multer({ dest: "public/uploads" });

// Ajout de uuid
// const { v4: uuidv4 } = require("uuid");
// On définit la destination de stockage de nos fichiers

const sendEmail = require("../sendEmail");

const router = express.Router();
const { authorization } = require("./middleware/auth"); // Modifie l'importation pour inclure uniquement le middleware authorization

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

router.get("/user", authorization, (req, res) => {
  // This route handler is only executed if the user is authenticated
  res.send(`Hello, ${req.userName}!`);
});
router.get("/books", BooksControllers.browse);
router.get("/books/:id", BooksControllers.read);
router.put("/books/:id", BooksControllers.edit);
router.post("/books", upload.single("picture_books"), BooksControllers.add); // ok
// router.post("/avatar", upload.single("avatar"), BooksControllers.addBook); // ok

// router.post("/books", upload.single("picture_books"), async (req, res) => {
//   try {
//     // On récupère le nom et le chemin du fichier
//     const { originalname, path } = req.file;

//     // On crée un objet Image avec les informations de l'image
//     const newImage = new Image({
//       name: originalname,
//       path,
//     });

//     // On enregistre l'image dans la base de données
//     const savedImage = await newImage.save();

//     // On appelle la méthode add du controller BooksControllers
//     await BooksControllers.add({ name_img: originalname, path_img: path });

//     res
//       .status(200)
//       .json({ message: "Image uploaded successfully", image: savedImage });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error uploading image" });
//   }
// });
// router.post("/books", BooksControllers.add);
router.delete("/books/:id", BooksControllers.destroy);
router.get("/books/:id", authorization, (req, res) => {
  // This route handler is only executed if the user is authenticated
  res.send(`Hello, ${req.userName}!`);
});
router.get("/bookshascharacters", BooksControllers.readHasBooks);
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
router.put("/images/:id", upload.single("url_img"), ImagesControllers.edit);
router.post("/images/", upload.single("url_img"), ImagesControllers.add); // ok
router.delete("/images/:id", ImagesControllers.destroy);

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
