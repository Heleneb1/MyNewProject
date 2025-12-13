// const cookieParser = require("cookie-parser");

// request >verify >route

const { decodeJWT } = require('../helper/jwtHelper');

// eslint-disable-next-line consistent-return
const authorization = async (req, res, next) => {
  try {
    const token = req.cookies.auth_token;

    if (!token) throw new Error('Token missing');
    const data = decodeJWT(token);
    req.userId = data.id;
    req.userName = data.user_name;
    req.role = data.role; // Stockez le rôle dans la requête
    if (req.role !== 1) {
      throw new Error('Unauthorized');
    }
    return next();
  } catch (error) {
    console.error(error);

    // pas Admin

    res.status(401).send('Merci de vous authentifier!');
  }
};

module.exports = { authorization };
