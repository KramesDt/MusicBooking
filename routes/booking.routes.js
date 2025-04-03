const router = require('express').Router();
const {    createBooking,
    getBookings,
    getBookingById,
    updateBooking,
    deleteBooking} = require('../controllers/booking.controller');
const { protect, restrictTo } = require("../middleware/authMiddleware.js");
const validate = require('../middleware/validate.js');
const { createBookingSchema, updateBookingSchema } = require('../utils/validation.js');

router.post('/create',protect, validate(createBookingSchema),  createBooking);
router.get('/', protect, validate(updateBookingSchema),getBookings);
router.get('/:id', protect, getBookingById);
router.put('/:id', protect, updateBooking);
router.delete('/:id', protect, deleteBooking);

module.exports = router;