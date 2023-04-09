require("dotenv").config();
const mailer = require("./src/mailer");

function sendEmail(to, message) {
  mailer
    .sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      subject: message.subject,
      text: message.text,
      html: message.html,
    })
    .then((info) => {
      console.info(`Email sent: ${info.response}`);
    })
    .catch((error) => {
      console.error(error);
    });
}

module.exports = { sendEmail };
