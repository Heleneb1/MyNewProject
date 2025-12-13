// const jwt = require("jsonwebtoken");

// const encodeJWT = (payload) => {
//   return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1h" });
// };
// const decodeJWT = (token) => {
//   return jwt.decode(token, process.env.TOKEN_SECRET);
// };
// module.exports = { encodeJWT, decodeJWT };
const jwt = require('jsonwebtoken');

const encodeJWT = (payload) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1h' });
};
// eslint-disable-next-line consistent-return
const verifyToken = (req, res, next) => {
  const token = req.cookies.auth_token || '';
  const authHeader = `Bearer ${token}`;

  req.headers.authorization = authHeader;

  // eslint-disable-next-line consistent-return
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = decoded;
    next();
  });
};

const decodeJWT = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    if (decoded == null) {
      console.info('Failed to verify token');
      return { verifyData: false };
    }
    return decoded;
  } catch (err) {
    console.error(err);
    return { verifyData: false };
  }
};

module.exports = { encodeJWT, decodeJWT, verifyToken };
