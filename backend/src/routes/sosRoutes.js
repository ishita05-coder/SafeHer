const express = require('express');
const router = express.Router();
const { triggerSOS, cancelSOS } = require('../controllers/sosController');
const { protect } = require('../middleware/authMiddleware');

router.post('/trigger', protect, triggerSOS);
router.put('/cancel', protect, cancelSOS);

module.exports = router;
