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
    if (errors) return res.status(HTTP_UNAUTHORIZED).json(errors);

    const [user] = await models.user.findByEmail(req.body.email);
    if (!user) return res.status(HTTP_UNAUTHORIZED).json({ message: 'Invalid Credentials 🥺' });

    const passwordVerification = await verifyPassword(req.body.password, user.password);
    if (!passwordVerification)
      return res.status(HTTP_UNAUTHORIZED).json({ message: 'Invalid Credentials 😼' });

    const token = encodeJWT({
      id: user.id,
      user_name: user.user_name,
      role: user.role
    });

    // Cookie friendly dev
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // false en dev
      sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax',
      maxAge: 1000 * 60 * 60 * 24 // 1 jour
    });

    return res.status(HTTP_OK).json({
      user_name: user.user_name,
      id: user.id,
      role: user.role,
      cart_id: user.cart_id
    });
  } catch (error) {
    console.error(error);
    return res.sendStatus(HTTP_SERVER_ERROR);
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie('auth_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax',
      path: '/'
    });
    return res.sendStatus(HTTP_OK);
  } catch (error) {
    console.error('Erreur lors de la déconnexion :', error);
    return res.status(HTTP_SERVER_ERROR).json({
      message: 'Une erreur est survenue lors de la déconnexion.'
    });
  }
};

module.exports = { login, logout };
