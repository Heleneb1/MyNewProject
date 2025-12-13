require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465, // SSL
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

transporter
  .verify()
  .then(() => console.log("Connexion SMTP Mailjet OK"))
  .catch((err) => console.error("Erreur SMTP Mailjet:", err));

module.exports = transporter;
