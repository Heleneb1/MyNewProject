const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");
const BooksControllers = require("./controllers/BooksControllers");
const CharactersControllers = require("./controllers/CharactersControllers");
const ImagesControllers = require("./controllers/ImagesControllers");
const QuotesControllers = require("./controllers/QuotesControllers");
const AuthContoller = require("./controllers/AuthController");
const UserController = require("./controllers/UserController");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

router.get("/books", BooksControllers.browse);
// router.get("/books/genre", BooksControllers.readByGenre);
router.get("/books/:id", BooksControllers.read);
router.put("/books/:id", BooksControllers.edit);
router.post("/books", BooksControllers.add);
router.delete("/books/:id", BooksControllers.destroy);

router.get("/characters", CharactersControllers.browse);
router.get("/characters/:id", CharactersControllers.read);
router.put("/characters/:id", CharactersControllers.edit);
router.post("/characters", CharactersControllers.add);
router.delete("/characters/:id", CharactersControllers.destroy);

router.get("/images", ImagesControllers.browse);
router.get("/images/:id", ImagesControllers.read);
router.put("/images/:id", ImagesControllers.edit);
router.post("/images", ImagesControllers.add);
router.delete("/images/:id", ImagesControllers.destroy);

router.get("/quotes", QuotesControllers.browse);
router.get("/quotes/:id", QuotesControllers.read);
router.put("/quotes/:id", QuotesControllers.edit);
router.post("/quotes", QuotesControllers.add);
router.delete("/quotes/:id", QuotesControllers.destroy);

router.get("/auth/login", AuthContoller.login);
router.get("auth/logout", AuthContoller.logout);

router.get("user/:id", UserController.getOne);
router.post("user/", UserController.createOne);
router.get("/user", UserController.browse);

module.exports = router;
