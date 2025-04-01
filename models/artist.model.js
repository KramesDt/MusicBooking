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

// Encrypt password using bcrypt before saving
artistSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(config.bcryptSalt);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare password for login
artistSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to get artist profile without sensitive data
artistSchema.methods.getPublicProfile = function () {
  const artistObject = this.toObject();
  delete artistObject.password;
  return artistObject;
};

module.exports = mongoose.model('Artist', artistSchema);