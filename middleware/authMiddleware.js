const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const Artist = require('../models/artist.model.js');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET ;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

// Generate JWT token
exports.generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });
};

// Protect routes middleware
exports.protect = async (req, res, next) => {
  try {
    let token;
    
    // Get token from Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'You are not logged in. Please log in to get access.'
      });
    }
    
    // Verify token
    const decoded = await promisify(jwt.verify)(token, JWT_SECRET);
    
    // Check if artist still exists
    const currentArtist = await Artist.findById(decoded.id);
    if (!currentArtist) {
      return res.status(401).json({
        status: 'fail',
        message: 'The artist belonging to this token no longer exists.'
      });
    }
    
    // Grant access to protected route
    req.artist = currentArtist;
    next();
    
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        status: 'fail',
        message: 'Invalid token. Please log in again.'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 'fail',
        message: 'Your token has expired. Please log in again.'
      });
    }
    
    next(error);
  }
};

// Restrict to admin users
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.artist.role)) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to perform this action'
      });
    }
    
    next();
  };
};
