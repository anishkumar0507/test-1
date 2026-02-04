const Patient = require('../models/Patient');
const { callbackDelaySeconds, defaultCountryCode } = require('../config/env');
const { placeCall } = require('./telephonyService');

const normalizePhoneNumber = (phoneNumber) => {
  if (!phoneNumber) {
    return null;
  }

  if (phoneNumber.startsWith('+')) {
    return phoneNumber;
  }

  return `${defaultCountryCode}${phoneNumber}`;
};

const findOrCreatePatient = async ({ phoneNumber, name }) => {
  const normalized = normalizePhoneNumber(phoneNumber);

  if (!normalized) {
    throw new Error('Phone number is required.');
  }

  let patient = await Patient.findOne({ phoneNumber: normalized });

  if (!patient) {
    patient = await Patient.create({
      name: name || 'Unknown',
      phoneNumber: normalized
    });
  }

  patient.lastCallAt = new Date();
  await patient.save();

  return patient;
};

const scheduleMissedCallCallback = ({ phoneNumber, fromNumber }) => {
  const normalized = normalizePhoneNumber(phoneNumber);

  if (!normalized) {
    return null;
  }

  setTimeout(async () => {
    try {
      await placeCall({
        to: normalized,
        from: fromNumber || normalized,
        callbackUrl: '/webhook/call'
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to place missed call callback:', error.message);
    }
  }, callbackDelaySeconds * 1000);

  return { scheduledInSeconds: callbackDelaySeconds };
};

module.exports = {
  normalizePhoneNumber,
  findOrCreatePatient,
  scheduleMissedCallCallback
};
