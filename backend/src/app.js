// import some node modules for later
require('dotenv').config();

const fs = require('node:fs');
const path = require('node:path');
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware pour parser les cookies
app.use(cookieParser());

// Route de health check pour CapRover (AVANT les autres middlewares)
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Configuration CORS
const allowedOrigins = [
  'http://localhost:5173',
  'https://heleneb1.github.io',//front
  'https://lesmysteresdelegypteantique.fr',//api sous ce nom de domaine
  'https://www.lesmysteresdelegypteantique.fr',
  'http://localhost:4173',  // Pour npm run preview
  'http://localhost:5173',  // Pour npm run dev
  'http://localhost:3000',  // Au cas où
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Autoriser les requêtes sans origin (comme CapRover health checks, Postman, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.some(allowed => origin.startsWith(allowed))) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// use some application-level middlewares
app.use(express.json());

// import and mount the API routes
const router = require('./router');

app.use(router);

// serve the backend/public folder for public resources
app.use(express.static(path.join(__dirname, '../public')));

const reactIndexFile = path.join(__dirname, '..', '..', 'frontend', 'dist', 'index.html');

if (fs.existsSync(reactIndexFile)) {
  app.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'dist')));

  app.get('*', (req, res) => {
    res.sendFile(reactIndexFile);
  });
}

module.exports = app;