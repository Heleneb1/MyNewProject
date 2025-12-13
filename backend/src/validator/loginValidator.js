const Joi = require('joi');

const validateLogin = (user) => {
  const result = Joi.object({
    email: Joi.string().email().presence('required'),
    password: Joi.string().min(8).max(30).presence('required')
  })
    .required()
    .min(1)
    .validate(user, { abortEarly: false }).error;

  if (result) {
    const errorMessages = result.details.map((error) => ({
      message: error.message
    }));
    return errorMessages;
  }

  return false;
};

module.exports = validateLogin;
