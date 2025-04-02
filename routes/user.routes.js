const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser
} = require('../controllers/user.controller');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @desc    Register a new user
 * @route   POST /api/users/register
 * @access  Public
 */
router.post('/register', registerUser);

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/users/login
 * @access  Public
 */
router.post('/login', loginUser);

/**
 * @desc    Update user profile
 * @route   PUT /api/users/:id
 * @access  Private
 */
router.put('/:id', authMiddleware, updateUser);

/**
 * @desc    Delete user
 * @route   DELETE /api/users/:id
 * @access  Private
 */
router.delete('/:id', authMiddleware, deleteUser);

module.exports = router;