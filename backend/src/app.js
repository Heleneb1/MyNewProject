// import some node modules for later
require('dotenv').config();

const fs = require('node:fs');
const path = require('node:path');
const cookieParser = require('cookie-parser');
// create express app

const express = require('express');

const app = express();
// Middleware pour parser les cookies

app.use(cookieParser());

// eslint-disable-next-line func-names
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// use some application-level middlewares

app.use(express.json()); // on remplie l'objet req.body avec les data envoyer du front ou postman

const cors = require('cors');

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:5173/',
    optionsSuccessStatus: 200
  }) // on donne les droit a au front de ce connecter
);
// import and mount the API routes
// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });

const router = require('./router'); // on importe notre routeur

app.use(router); // on envoie la requet dans le fichier router.js

// serve the backend/public folder for public resources

app.use(express.static(path.join(__dirname, '../public')));
// app.use("/public", express.static("public"));
// app.get('*', (req, res) => {
//   res.status(404).json({ message: 'Not found!' })
// })
const reactIndexFile = path.join(__dirname, '..', '..', 'frontend', 'dist', 'index.html');

if (fs.existsSync(reactIndexFile)) {
  // serve REACT resources

  app.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'dist')));

  // redirect all requests to the REACT index file

  app.get('*', (req, res) => {
    res.sendFile(reactIndexFile);
  });
}

// ready to export

module.exports = app;
