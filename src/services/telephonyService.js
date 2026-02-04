const axios = require('axios');
const { telephony } = require('../config/env');

const placeCall = async ({ to, from, callbackUrl }) => {
  if (!telephony.baseUrl || !telephony.apiKey) {
    return { status: 'skipped', reason: 'telephony provider not configured' };
  }

  const response = await axios.post(
    `${telephony.baseUrl}/calls`,
    { to, from, callbackUrl },
    { headers: { Authorization: `Bearer ${telephony.apiKey}` } }
  );

  return response.data;
};

module.exports = { placeCall };
