const jwt = require("jsonwebtoken");

const encodeJWT = (payload) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1h" });
};
const decodeJWT = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    return decoded;
  } catch (err) {
    return null;
  }
};
module.exports = { encodeJWT, decodeJWT };
