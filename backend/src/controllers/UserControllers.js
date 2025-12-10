/* eslint-disable consistent-return */
const models = require("../models");
const validateUser = require("../validator/userValidator");
const { hashPassword } = require("../helper/argonHelper");

const getOne = async (req, res) => {
  const userId = (req.params.id, 10);
  try {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(userId)) throw new Error("erreur");
    const [user] = await models.user.findOne(userId);
    res.send(user);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
const getToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  if (req.query && req.query.token) {
    return req.query.token;
  }
  // return null;
};
const protection = (req, res) => {
  const token = getToken(req);

  if (token === null) {
    res.status(200).json({
      mess: "n'a pas accès aux données",
      verifyData: false,
      role: false,
    });
  }
};
const getById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await models.user.findOne(userId);
    if (!user) {
      res.sendStatus(404);
    } else {
      res.send(user);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const browse = (req, res) => {
  models.user
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// eslint-disable-next-line consistent-return
// Added NN and UQ for email no duplicate entry
const createOne = async (req, res) => {
  try {
    const errors = validateUser(req.body);
    if (errors) {
      return res.status(401).send(errors);
    }

    const hashedPassword = await hashPassword(req.body.password);

    const result = await models.user.addOne({
      ...req.body,
      password: hashedPassword,
    });
    res.status(201).send(result);
  } catch (error) {
    console.info(error);
    res.sendStatus(500);
  }
};
module.exports = { getOne, createOne, browse, getById, getToken, protection };
