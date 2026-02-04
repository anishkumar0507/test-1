const express = require('express');
const { handleIncomingCall, handleCallStatus } = require('../controllers/webhookController');

const router = express.Router();

router.post('/call', handleIncomingCall);
router.post('/call-status', handleCallStatus);

module.exports = router;
