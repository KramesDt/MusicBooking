const jwt = require('jsonwebtoken');
const config = require('../config/default');
const Artist = require('../models/artist.model.js');

/**
 * Authentication middleware to verify JWT token
 */
const auth = async (req, res, next) => {
  // Get token from header - support both x-auth-token and Authorization: Bearer format
  let token = req.header('x-auth-token');
  
  // Check for Authorization header (Bearer token)
  const authHeader = req.header('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  }

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.jwtSecret);

    // Find artist by id
    const artist = await Artist.findById(decoded.artist.id).select('-password');
    
    if (!artist) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    if (!artist.isActive) {
      return res.status(401).json({ message: 'Account is not active' });
    }

    // Add artist to request
    req.artist = artist;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;
