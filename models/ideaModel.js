const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ideaSchema = new Schema({
  title: {
    type: String,
    maxlength: 140,
    required: true
  },
  body: {
    type: String,
    required: true,
    trim: true,
    maxlength: 140
  },
  author: {
    type: String,
    maxlength: 100,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now(),
    required: true
  }
});

module.exports = mongoose.model('ideas', ideaSchema);
