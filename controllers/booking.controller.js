const Booking = require('../models/booking.model');
const Event = require('../models/event.model');
const User = require('../models/user.model');

const createBooking = async (req, res) => {
    try {
        const { events, title, price } = req.body;
        const userId = req.user._id;
    
        // Check if events exist
        const eventDocs = await Event.find({ _id: { $in: events } });
        if (eventDocs.length !== events.length) {
        return res.status(404).json({ message: 'Some events not found' });
        }
    
        // Create booking
        const booking = new Booking({
        title,
        events,
        price,
        paymentStatus: 'pending'
        });
    
        await booking.save();
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.bookings.push(booking._id);
        await user.save();
    
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('events');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('events');
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const updateBooking = async (req, res) => {
    try {
        const { title, events, price } = req.body;
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { title, events, price },
            { new: true }
        ).populate('events');
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createBooking,
    getBookings,
    getBookingById,
    updateBooking,
    deleteBooking
}