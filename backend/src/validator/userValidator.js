const Joi = require("joi");

const validateUser = (user) => {
  const { error } = Joi.object({
    user_name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(30).required(),
  })
    .required()
    .min(1)
    .validate(user, { abortEarly: false });

  if (error) {
    return error.details.map((errors) => errors.message);
  }

  return false;
};

module.exports = validateUser;
