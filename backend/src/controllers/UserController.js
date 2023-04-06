const models = require("../models");
const validateUser = require("../validator/userValidator");
const { hashPassword } = require("../helper/argonHelper");

const getOne = async (req, res) => {
  const userId = parseInt(req.params.id, 10);
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
const createOne = async (req, res) => {
  try {
    console.info("req.body", req.body);
    const errors = validateUser(req.body);
    if (errors) {
      return res.status(401).send(errors);
    }
    const hashedPassword = await hashPassword(req.body.password);
    console.info(hashedPassword);
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
module.exports = { getOne, createOne, browse };
