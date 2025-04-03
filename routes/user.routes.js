const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getAllUsers,
  updateUser,
  deleteUser
} = require('../controllers/auth.controller.js');
const {protect, restrictTo} = require('../middleware/authMiddleware.js');
const validate = require('../middleware/validate.js');
const {
  registerUserSchema,
  updateUserSchema,
  loginSchema,

} = require("../utils/validation.js");

/**
 * @desc    Register a new user
 * @route   POST /api/users/register
 * @access  Public
 */
router.post('/register', validate(registerUserSchema), register);

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/users/login
 * @access  Public
 */
router.post('/login', validate(loginSchema), login);

/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Private
 */
router.get('/', protect, restrictTo("admin"), getAllUsers);

/**
 * @desc    Update user profile
 * @route   PUT /api/users/:id
 * @access  Private
 */
router.put('/:id',protect , validate(updateUserSchema), updateUser);

/**
 * @desc    Delete user
 * @route   DELETE /api/users/:id
 * @access  Private
 */
router.delete("/:id", protect, restrictTo("admin"), deleteUser);

module.exports = router;