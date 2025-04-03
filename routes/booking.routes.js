const router = require('express').Router();
const {    createBooking,
    getBookings,
    getBookingById,
    updateBooking,
    deleteBooking} = require('../controllers/booking.controller');
const { protect, restrictTo } = require("../middleware/authMiddleware.js");
const { validate } = require('../middlewares/validation.middleware');

router.post('/create', protect, createBooking);
router.get('/', protect, getBookings);
router.get('/:id', protect, getBookingById);
router.put('/:id', protect, updateBooking);
router.delete('/:id', protect, deleteBooking);

module.exports = router;