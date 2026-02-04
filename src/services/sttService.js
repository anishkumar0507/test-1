const { sttApiKey } = require('../config/env');

const transcribeAudio = async ({ audioUrl, language = 'hi-IN' }) => {
  if (!audioUrl) {
    throw new Error('audioUrl is required for transcription.');
  }

  return {
    text: 'Yeh ek placeholder transcription hai. (Hindi/Hinglish)',
    language,
    provider: sttApiKey ? 'configured-provider' : 'placeholder'
  };
};

module.exports = { transcribeAudio };
