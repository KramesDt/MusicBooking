const express = require('express');
const router = express.Router();
const {
  register,
  updateArtist,
  deleteArtist,
  getAllArtists,
  getArtistById
} = require('../controllers/artist.controller.js');
const {protect, restrictTo} = require('../middleware/authMiddleware.js');
const validate = require('../middleware/validate.js');
const {registerArtistSchema} = require('../utils/validation.js');

/**
 * @desc    Register a new artist
 * @route   POST /api/artists/register
 * @access  Public
 */
router.post('/register', validate(registerArtistSchema), protect, restrictTo("admin"), register);

/**
 * @desc    Get all artists
 * @route   GET /api/artists
 * @access  Public
 */
router.get('/', getAllArtists);

/**
 * @desc    Get artist by ID
 * @route   GET /api/artists/:id
 * @access  Public
 */
router.get('/:id', getArtistById);

/**
 * @desc    Update artist profile
 * @route   PUT /api/artists/:id
 * @access  Private
 */
router.put('/:id',protect, restrictTo("admin") , updateArtist);

/**
 * @desc    Delete artist
 * @route   DELETE /api/artists/:id
 * @access  Private
 */
router.delete('/:id', protect, restrictTo("admin"), deleteArtist);

module.exports = router;
