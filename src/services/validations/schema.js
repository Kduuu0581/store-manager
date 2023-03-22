const Joi = require('joi');

const validateName = Joi.string().min(5);
const validateQuantity = Joi.number().min(1);

module.exports = {
  validateName,
  validateQuantity,
};