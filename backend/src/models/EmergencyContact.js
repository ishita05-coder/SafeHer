const mongoose = require('mongoose');

const emergencyContactSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please add a contact name']
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number']
  },
  relation: {
    type: String,
    required: [true, 'Please specify the relationship (e.g. Mother, Friend)']
  },
  priority: {
    type: Number,
    min: 1,
    max: 5,
    default: 1
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('EmergencyContact', emergencyContactSchema);
