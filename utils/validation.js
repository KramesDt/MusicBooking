const Joi = require('joi');

// Register validation schema
const registerArtistSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phoneNo: Joi.string().pattern(/^\d{10}$/).required()
    .messages({
      'string.pattern.base': 'Phone number must be 10 digits'
    }),
  genre: Joi.string().valid('pop', 'rock', 'jazz', 'classical').required(),
  availability: Joi.string().valid('true', 'false'),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    .messages({
      'any.only': 'Passwords do not match'
    }),
  name: Joi.string().required(),
});

// Login validation schema
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// Register validation schema
const registerUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().required(),
  role: Joi.string().valid('admin', 'user').required(),
});

// Update user schema
const updateUserSchema = Joi.object({
  fullName: Joi.string(),
  password: Joi.string().min(6),
  confirmPassword: Joi.string().valid(Joi.ref('password'))
    .when('password', {
      is: Joi.exist(),
      then: Joi.required(),
      otherwise: Joi.optional()
    })
    .messages({
      'any.only': 'Passwords do not match'
    })
});

module.exports = {
  registerUserSchema,
  registerArtistSchema,
  loginSchema,
  updateUserSchema
};
