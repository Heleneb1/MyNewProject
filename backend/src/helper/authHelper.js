/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const cookieParser = require('cookie-parser');

const authToken = req.cookies.auth_token || '';
module.exports = { authToken };
