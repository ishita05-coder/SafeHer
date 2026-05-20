const EmergencyContact = require('../models/EmergencyContact');

const getContacts = async (req, res) => {
  try {
    const contacts = await EmergencyContact.find({ user: req.user._id });
    res.json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const addContact = async (req, res) => {
  const { name, phone, relation } = req.body;
  try {
    if (!name || !phone || !relation) {
      return res.status(400).json({ success: false, error: 'Please provide all required fields' });
    }
    const contact = await EmergencyContact.create({
      user: req.user._id,
      name,
      phone,
      relation
    });
    res.status(201).json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contact = await EmergencyContact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, error: 'Contact not found' });
    }
    if (contact.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, error: 'Not authorized to delete this contact' });
    }
    await contact.deleteOne();
    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { getContacts, addContact, deleteContact };
