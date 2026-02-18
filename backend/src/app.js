require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet'); // sécurité HTTP headers

const app = express();

// ----- Sécurité et parsing -----
app.use(helmet()); // ajoute des headers de sécurité
app.use(cookieParser());
app.use(express.json({ limit: '10kb' })); // limite les requêtes JSON à 10 Ko

// ----- Rate limiting global -----
const globalLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // max 100 requêtes par IP par minute
  standardHeaders: true,
  legacyHeaders: false
});
app.use(globalLimiter);

// ----- Health check (avant les autres middlewares) -----
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// ----- CORS -----
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  'http://localhost:3000',
  'https://heleneb1.github.io',
  'https://lesmysteresdelegypteantique.fr',
  'https://www.lesmysteresdelegypteantique.fr',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
  })
);

// ----- API routes -----
const router = require('./router');
app.use(router);

// ----- Static files -----
app.use(express.static(path.join(__dirname, '../public')));

const reactDist = path.join(__dirname, '..', '..', 'frontend', 'dist');
if (fs.existsSync(reactDist)) {
  app.use(express.static(reactDist));
}

// ----- Catch-all pour React SPA -----
app.get('*', (req, res) => {
  if (fs.existsSync(path.join(reactDist, 'index.html'))) {
    res.sendFile(path.join(reactDist, 'index.html'));
  } else {
    res.status(404).send('Not Found');
  }
});

module.exports = app;
