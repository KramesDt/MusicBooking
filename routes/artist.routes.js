const express = require('express');
const router = express.Router();
const {
  register,
  login,
  updateArtist,
  deleteArtist
} = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @desc    Register a new artist
 * @route   POST /api/artists/register
 * @access  Public
 */
router.post('/register', register);

/**
 * @desc    Authenticate artist & get token
 * @route   POST /api/artists/login
 * @access  Public
 */
router.post('/login', login);

/**
 * @desc    Update artist profile
 * @route   PUT /api/artists/:id
 * @access  Private
 */
router.put('/:id', authMiddleware, updateArtist);

/**
 * @desc    Delete artist
 * @route   DELETE /api/artists/:id
 * @access  Private
 */
router.delete('/:id', authMiddleware, deleteArtist);

module.exports = router;
