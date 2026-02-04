const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true, index: true, unique: true },
    preferredLanguage: { type: String, default: 'hi-IN' },
    lastCallAt: { type: Date },
    lastIntent: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Patient', patientSchema);
