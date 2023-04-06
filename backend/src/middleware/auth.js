const { decodeJWT } = require("../helper/jwtHelper");

// eslint-disable-next-line consistent-return
const authorization = async (req, res, next) => {
  try {
    // eslint-disable-next-line dot-notation
    const token = req.cookies["auth_token"];
    if (!token) throw new Error();
    const data = decodeJWT(token);
    req.userId = data.id;
    req.userName = data.name;
    return next();
  } catch (error) {
    console.error(error);
    res.sendStatus(401);
  }
};

module.exports = authorization;
