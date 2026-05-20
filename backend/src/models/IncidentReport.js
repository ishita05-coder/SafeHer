const mongoose = require('mongoose');

const incidentReportSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  type: {
    type: String,
    enum: ['harassment', 'stalking', 'suspicious_activity', 'other'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    address: { type: String }
  },
  mediaUrls: [{
    type: String
  }],
  isAnonymous: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('IncidentReport', incidentReportSchema);
