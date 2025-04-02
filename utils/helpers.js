const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../config/default');

/**
 * Generate a JWT token for a user
 * @param {Object} user - User object with id
 * @returns {String} JWT token
 */
const generateToken = (user) => {
  return jwt.sign(
    { user: { id: user.id } },
    config.jwtSecret,
    { expiresIn: config.jwtExpiration }
  );
};

/**
 * Generate a random string for referral codes or other uses
 * @param {Number} length - Length of the string
 * @returns {String} Random string
 */
const generateRandomString = (length = 8) => {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length)
    .toUpperCase();
};


/**
 * Check if a date is older than specified days
 * @param {Date} date - Date to check
 * @param {Number} days - Number of days
 * @returns {Boolean} True if date is older than days
 */
const isOlderThan = (date, days) => {
  const now = new Date();
  const diff = now - new Date(date);
  return diff > days * 24 * 60 * 60 * 1000;
};

/**
 * Calculate percentage of a value
 * @param {Number} value - The base value
 * @param {Number} percentage - The percentage to calculate
 * @returns {Number} The calculated value
 */
const calculatePercentage = (value, percentage) => {
  return (value * percentage);
};

module.exports = {
  generateToken,
  generateRandomString,
  isOlderThan,
  calculatePercentage
};
