const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const config = require("../config/default");

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNo: {
    type: Number
  },
  genre: {
    type: String,
    required: true
  },
  bio: String,
  availability: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

// Method to get artist profile without sensitive data
artistSchema.methods.getPublicProfile = function () {
  const artistObject = this.toObject();
  return artistObject;
};

module.exports = mongoose.model('Artist', artistSchema);