const Joi = require('joi');

/**
 * Validation middleware
 * @param {Object} schema - Joi validation schema
 * @param {String} property - Request property to validate ('body', 'query', 'params')
 */
const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], { abortEarly: false });
    
    if (!error) {
      return next();
    }

    const errors = {};
    error.details.forEach((detail) => {
      const key = detail.path[0];
      const message = detail.message.replace(/"/g, '');
      errors[key] = message;
    });

    return res.status(400).json({ 
      message: 'Validation error', 
      errors 
    });
  };
};

module.exports = validate;
