/* eslint-disable consistent-return */
const validateLogin = require("../validator/loginValidator");
const models = require("../models");
// const { findByEmail } = require("../models/UserManager");
const { verifyPassword } = require("../helper/argonHelper");
const { encodeJWT } = require("../helper/jwtHelper");

const login = async (req, res) => {
  try {
    const errors = validateLogin(req.body);
    if (errors) {
      return res.status(401).send(errors);
    }
    // eslint-disable-next-line no-undef
    const [user] = await models.user.findByEmail(req.body.email);
    if (!user) return res.status(401).send("Invalid Credentials");

    const passwordVerification = await verifyPassword(
      user.password,
      req.body.password
    );

    if (!passwordVerification)
      return res.status(401).send("Invalid Credentials");
    delete user.password;

    const token = encodeJWT(user);
    res.cookie("auth_token", token, { httpOnly: true, secure: false }); // ne jamais app auth_token et en production passer secure à true

    res.status(200).json({ user: user.name }); // on peut juste mettre user name est pour personnaliser
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
const logout = (req, res) => {
  res.clearCookie("auth_token").sendStatus(200);
};
module.exports = { login, logout };
