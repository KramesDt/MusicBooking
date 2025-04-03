const express = require('express');
const router = express.Router();
const {
  register,
  login,
  updateUser,
  deleteUser
} = require('../controllers/auth.controller.js');
const {protect, restrictTo} = require('../middleware/authMiddleware.js');

/**
 * @desc    Register a new user
 * @route   POST /api/users/register
 * @access  Public
 */
router.post('/register', register);

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/users/login
 * @access  Public
 */
router.post('/login', login);

/**
 * @desc    Update user profile
 * @route   PUT /api/users/:id
 * @access  Private
 */
router.put('/:id',protect ,updateUser);

/**
 * @desc    Delete user
 * @route   DELETE /api/users/:id
 * @access  Private
 */
router.delete("/:id", protect, restrictTo("admin"), deleteUser);

module.exports = router;