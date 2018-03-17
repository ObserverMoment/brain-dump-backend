const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    validate: value => validator.isEmail(value)
  },
  displayName: {
    type: String,
    trim: true,
    maxlength: 30,
    required: true
  },
  password: {
    type: String,
    minlength: 8,
    required: true
  },
  sigupDate: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('users', userSchema);
