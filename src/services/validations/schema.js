const Joi = require('joi');

const validateName = Joi.string().min(5);

module.exports = validateName;