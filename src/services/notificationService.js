const axios = require('axios');
const { whatsappApiKey, smsApiKey } = require('../config/env');

const sendWhatsAppConfirmation = async ({ to, message }) => {
  if (!whatsappApiKey) {
    return { status: 'skipped', reason: 'WhatsApp API key missing' };
  }

  const response = await axios.post(
    'https://api.whatsapp.example.com/messages',
    { to, message },
    { headers: { Authorization: `Bearer ${whatsappApiKey}` } }
  );

  return response.data;
};

const sendSmsConfirmation = async ({ to, message }) => {
  if (!smsApiKey) {
    return { status: 'skipped', reason: 'SMS API key missing' };
  }

  const response = await axios.post(
    'https://api.sms.example.com/messages',
    { to, message },
    { headers: { Authorization: `Bearer ${smsApiKey}` } }
  );

  return response.data;
};

module.exports = { sendWhatsAppConfirmation, sendSmsConfirmation };
