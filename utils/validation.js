const Joi = require('joi');

// Register validation schema
const registerArtistSchema = Joi.object({
  email: Joi.string().email().required(),
  bio: Joi.string(),
  phone: Joi.string().pattern(/^\d{10}$/).required()
    .messages({
      'string.pattern.base': 'Phone number must be 10 digits'
    }),
  genre: Joi.string().valid('pop', 'rock', 'jazz', 'classical').required(),
  availability: Joi.string().valid('true', 'false'),
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
  name: Joi.string(),
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

// Create booking schema
const createBookingSchema = Joi.object({
  title: Joi.string().required(),
  events: Joi.array().items(Joi.string()).required(),
  price: Joi.number().required(),
  paymentStatus: Joi.string().valid('pending', 'confirmed', 'cancelled').default('pending'),
});

// Update booking schema
const updateBookingSchema = Joi.object({
  title: Joi.string(),
  events: Joi.array().items(Joi.string()),
  price: Joi.number(),
  paymentStatus: Joi.string()
    .valid("pending", "confirmed", "cancelled")
    .default("pending"),
});

//create event schema
const createEventSchema = Joi.object({
  title: Joi.string(),
  date: Joi.date(),
  artist: Joi.string(),
  ticketPrice: Joi.number(),
  venue: Joi.object(),
  status: Joi.string().valid("upcoming", "completed", "cancelled"),
});
//update event schema 
const updateEventSchema = Joi.object({
  title: Joi.string(),
  date: Joi.date(),
  artist: Joi.string(),
  ticketPrice: Joi.number(),
  venue: Joi.object(),
  status: Joi.string().valid('upcoming', 'completed', 'cancelled'),
});
module.exports = {
  registerUserSchema,
  registerArtistSchema,
  loginSchema,
  updateUserSchema,
  createBookingSchema,
  updateBookingSchema,
  createEventSchema,
  updateEventSchema,
};
