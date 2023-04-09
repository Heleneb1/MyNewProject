const cookieParser = require("cookie-parser");
const { decodeJWT } = require("../helper/jwtHelper");

// eslint-disable-next-line consistent-return
const authorization = async (req, res, next) => {
  try {
    const token = req.cookies.auth_token;
    console.info("TTTTTTTTT", token);
    if (!token) throw new Error("Token missing");

    const data = decodeJWT(token);
    req.userId = data.id;
    req.userName = data.user_name;
    req.role = data.role; // Stockez le rôle dans la requête
    return next();
  } catch (error) {
    console.error(error);
    res.sendStatus(401);
  }
};

module.exports = { authorization, cookieParser };
