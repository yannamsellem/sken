const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
