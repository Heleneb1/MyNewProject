// const cookieParser = require("cookie-parser");

// eslint-disable-next-line no-unused-vars
const jwt = require("jsonwebtoken");
const validateLogin = require("../validator/loginValidator");
const models = require("../models");
const { verifyPassword } = require("../helper/argonHelper");
// eslint-disable-next-line no-unused-vars
const { encodeJWT, decodeJWT } = require("../helper/jwtHelper");

// const decodeJWT = (token) => {
//   const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
//   const decoded = jwt.verify(token, secret);
//   return decoded;
// };

// module.exports = { decodeJWT };

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

    // const decodeToken = async (next) => {
    //   try {
    //     const token = req.cookies.auth_token;
    //     console.log("Ok", token);
    //     console.info("frontToken", token);
    //     if (!token) throw new Error("Token missing");
    //     const data = decodeJWT(token);
    //     req.userId = data.id;
    //     req.userName = data.user_name;
    //     req.role = data.role; // Stockez le rôle dans la requête
    //     console.log("Ok Authcontroller", data);
    //     return next();
    //   } catch (error) {
    //     console.error(error);

    //     // pas Connecté

    //     res.status(401).send("Merci de vous authentifier!");
    //   }
    // };

    const token = encodeJWT(user);
    res.cookie("auth_token", token, { httpOnly: true, secure: false }); // ne jamais app auth_token et en production passer secure à true

    // Récupération du token depuis le cookie
    const cookieToken = req.cookies.auth_token;
    console.info("cookieToken", cookieToken);

    res.status(200).json({
      user_name: user.user_name,
      id: user.id,
      role: user.role,
      cart_id: user.cart_id,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const logout = (req, res) => {
  res.clearCookie(req.cookies.auth_token).sendStatus(200);
};

module.exports = { login, logout };
// const validateLogin = require("../validator/loginValidator");
// const models = require("../models");
// const { verifyPassword } = require("../helper/argonHelper");
// const { encodeJWT } = require("../helper/jwtHelper");

// // eslint-disable-next-line consistent-return
// const login = async (req, res) => {
//   try {
//     const errors = validateLogin(req.body);
//     if (errors) {
//       return res.status(401).send(errors);
//     }

//     const [user] = await models.user.findByEmail(req.body.email);
//     if (!user) {
//       return res.status(401).send("Invalid Credentials");
//     }

//     const passwordVerification = await verifyPassword(
//       req.body.password,
//       user.password
//     );
//     if (!passwordVerification) {
//       return res.status(401).send("Invalid Credentials");
//     }

//     const token = encodeJWT(user);
//     res.status(200).json({
//       user_name: user.user_name,
//       id: user.id,
//       role: user.role,
//       token,
//     });
//   } catch (error) {
//     console.error(error);
//     res.sendStatus(500);
//   }
// };

// const logout = (req, res) => {
//   res.sendStatus(200);
// };

// module.exports = { login, logout };
