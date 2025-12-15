require('dotenv').config();
const app = require('./src/app');

const port = process.env.PORT || 5000;

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.error('Something bad happened', err);
  } else {
    console.info(`Server is listening on ${port}, Welcome 😊`);
  }
});
