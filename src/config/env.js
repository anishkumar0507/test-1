const dotenv = require('dotenv');

dotenv.config();

const required = ['MONGO_URI'];

required.forEach((key) => {
  if (!process.env[key]) {
    // eslint-disable-next-line no-console
    console.warn(`Missing required environment variable: ${key}`);
  }
});

module.exports = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI,
  telephony: {
    baseUrl: process.env.TELEPHONY_PROVIDER_URL,
    apiKey: process.env.TELEPHONY_API_KEY
  },
  sttApiKey: process.env.STT_API_KEY,
  ttsApiKey: process.env.TTS_API_KEY,
  whatsappApiKey: process.env.WHATSAPP_API_KEY,
  smsApiKey: process.env.SMS_API_KEY,
  googleCalendarApiKey: process.env.GOOGLE_CALENDAR_API_KEY,
  defaultCountryCode: process.env.DEFAULT_COUNTRY_CODE || '+91',
  callbackDelaySeconds: Number(process.env.CALLBACK_DELAY_SECONDS || 300)
};
