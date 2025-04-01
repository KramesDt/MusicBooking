const jwt = require('jsonwebtoken');
const config = require('../config/default');
const User = require('../models/User');

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

    // Find user by id
    const user = await User.findById(decoded.user.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    if (!user.isActive) {
      return res.status(401).json({ message: 'Account is not active' });
    }

    // Add user to request
    req.user = user;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;
