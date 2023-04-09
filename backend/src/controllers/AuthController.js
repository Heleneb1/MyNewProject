const validateLogin = require("../validator/loginValidator");
const models = require("../models");
const { verifyPassword } = require("../helper/argonHelper");
const { encodeJWT } = require("../helper/jwtHelper");

// eslint-disable-next-line consistent-return
const login = async (req, res) => {
  try {
    const errors = validateLogin(req.body);
    if (errors) {
      return res.status(401).send(errors);
    }

    const [user] = await models.user.findByEmail(req.body.email);
    if (!user) {
      return res.status(401).send("Invalid Credentials");
    }

    const passwordVerification = await verifyPassword(
      req.body.password,
      user.password
    );
    if (!passwordVerification) {
      return res.status(401).send("Invalid Credentials");
    }

    const token = encodeJWT(user);
    res.cookie("auth_token", token, { httpOnly: true, secure: false });
    res
      .status(200)
      .json({ user_name: user.user_name, id: user.id, role: user.role });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const logout = (req, res) => {
  res.clearCookie("auth_token").sendStatus(200);
};

module.exports = { login, logout };
