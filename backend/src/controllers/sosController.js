const SOSAlert = require('../models/SOSAlert');
const User = require('../models/User');
const EmergencyContact = require('../models/EmergencyContact');
const sendSMS = require('../utils/sendSMS');

// @desc    Trigger an SOS Alert
// @route   POST /api/sos/trigger
// @access  Private
const triggerSOS = async (req, res) => {
  const { location, triggerMethod } = req.body;

  try {
    if (!location || !location.lat || !location.lng) {
      return res.status(400).json({ success: false, error: 'Location is required to trigger SOS' });
    }

    // Create the alert
    const alert = await SOSAlert.create({
      user: req.user._id,
      location,
      triggerMethod: triggerMethod || 'button'
    });

    // Update user status
    await User.findByIdAndUpdate(req.user._id, { 
      isSOSActive: true,
      lastKnownLocation: location
    });

    // Fetch user's emergency contacts
    const contacts = await EmergencyContact.find({ user: req.user._id });

    // Send SMS to contacts
    const mapsLink = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
    const message = `URGENT SOS from ${req.user.name}! They have triggered an emergency alert. Location: ${mapsLink}`;

    if (contacts.length > 0) {
      const smsPromises = contacts.map(contact => sendSMS(contact.phone, message));
      await Promise.all(smsPromises);
    } else {
      console.log(`[WARNING] No emergency contacts found for user: ${req.user.name}`);
    }

    console.log(`[ALERT] SOS triggered by ${req.user.name} at ${location.lat}, ${location.lng}`);

    res.status(201).json({
      success: true,
      data: alert,
      message: 'SOS Alert triggered and contacts notified'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Cancel/Resolve an SOS Alert
// @route   PUT /api/sos/cancel
// @access  Private
const cancelSOS = async (req, res) => {
  try {
    // Find active alert for user
    const alert = await SOSAlert.findOneAndUpdate(
      { user: req.user._id, status: 'active' },
      { status: 'resolved', resolvedAt: Date.now() },
      { new: true }
    );

    if (!alert) {
      return res.status(404).json({ success: false, error: 'No active SOS alert found' });
    }

    // Update user status
    await User.findByIdAndUpdate(req.user._id, { isSOSActive: false });

    // Notify contacts about cancellation
    const contacts = await EmergencyContact.find({ user: req.user._id });
    const message = `UPDATE: ${req.user.name} has cancelled their SOS alert and is safe.`;

    if (contacts.length > 0) {
      const smsPromises = contacts.map(contact => sendSMS(contact.phone, message));
      await Promise.all(smsPromises);
    }

    res.status(200).json({
      success: true,
      data: alert,
      message: 'SOS Alert cancelled successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  triggerSOS,
  cancelSOS
};
