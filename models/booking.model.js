const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  events: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  }],
  price: Number,
  paymentStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);