// const jwt = require("jsonwebtoken");
const validateLogin = require('../validator/loginValidator');
const models = require('../models');
const { verifyPassword } = require('../helper/argonHelper');
const { encodeJWT } = require('../helper/jwtHelper');

// Utilisation de constantes pour les codes de statut HTTP
const HTTP_OK = 200;
const HTTP_UNAUTHORIZED = 401;
const HTTP_SERVER_ERROR = 500;

const login = async (req, res) => {
  try {
    const errors = validateLogin(req.body);
    if (errors) {
      return res.status(HTTP_UNAUTHORIZED).json(errors);
    }

    const [user] = await models.user.findByEmail(req.body.email);
    if (!user) {
      return res.status(HTTP_UNAUTHORIZED).json({ message: 'Invalid Credentials 🥺' });
    }

    const passwordVerification = await verifyPassword(req.body.password, user.password);
    if (!passwordVerification) {
      return res.status(HTTP_UNAUTHORIZED).json({ message: 'Invalid Credentials 😼' });
    }

    const token = encodeJWT({
      id: user.id,
      user_name: user.user_name,
      role: user.role
    });
    // res.cookie("auth_token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "Strict", // ou 'Lax' selon votre cas d'utilisation
    // });
    console.info('token', token);
    return res.status(HTTP_OK).json({
      user_name: user.user_name,
      id: user.id,
      role: user.role,
      cart_id: user.cart_id
    });
  } catch (error) {
    console.error(error);
    return res.sendStatus(HTTP_SERVER_ERROR); // Assurez-vous aussi d'ajouter `return` ici
  }
};
// const decodeToken = async (req, res, next) => {
//   try {
//     const token = req.cookies.auth_token;
//     if (!token) {
//       throw new Error("Token missing");
//     }

//     const data = decodeJWT(token);
//     req.userId = data.id;
//     req.userName = data.user_name;
//     req.role = data.role;

//     return next();
//   } catch (error) {
//     console.error(error);
//     res.status(HTTP_UNAUTHORIZED).json({ message: "Please authenticate!" });
//   }
// };

const logout = (req, res) => {
  try {
    res
      // .clearCookie("auth_token", {
      //   httpOnly: true,
      //   // secure: process.env.NODE_ENV === "production",
      //   path: "/",
      //   sameSite: "Strict",
      // })
      .sendStatus(HTTP_OK);
  } catch (error) {
    console.error('Erreur lors de la déconnexion :', error);
    res
      .status(HTTP_SERVER_ERROR)
      .json({ message: 'Une erreur est survenue lors de la déconnexion.' });
  }
};

module.exports = { login, logout };
