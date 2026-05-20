const mongoose = require('mongoose');

const sosAlertSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'resolved', 'false_alarm'],
    default: 'active'
  },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  triggerMethod: {
    type: String,
    enum: ['button', 'voice', 'ai'],
    default: 'button'
  },
  resolvedAt: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('SOSAlert', sosAlertSchema);
