const express = require('express');
const router = express.Router();
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  updateEventStatus,
  deleteEvent
} = require('../controllers/event.controller.js');
const authMiddleware = require('../middleware/authMiddleware.js');

/**
 * @desc    Create new event
 * @route   POST /api/events
 * @access  Private
 */
router.post('/', authMiddleware, createEvent);

/**
 * @desc    Get all events
 * @route   GET /api/events
 * @access  Public
 */
router.get('/', getAllEvents);

/**
 * @desc    Get single event
 * @route   GET /api/events/:id
 * @access  Public
 */
router.get('/:id', getEventById);

/**
 * @desc    Update event details
 * @route   PUT /api/events/:id
 * @access  Private
 */
router.put('/:id', authMiddleware, updateEvent);

/**
 * @desc    Update event status
 * @route   PATCH /api/events/:id/status
 * @access  Private
 */
router.patch('/:id/status', authMiddleware, updateEventStatus);

/**
 * @desc    Delete event
 * @route   DELETE /api/events/:id
 * @access  Private
 */
router.delete('/:id', authMiddleware, deleteEvent);

module.exports = router;
