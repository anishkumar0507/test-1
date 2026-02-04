const { ttsApiKey } = require('../config/env');

const synthesizeSpeech = async ({ text, voice = 'hi-IN-Standard-A' }) => {
  if (!text) {
    throw new Error('text is required for text-to-speech.');
  }

  return {
    audioUrl: 'https://audio.example.com/placeholder.mp3',
    voice,
    provider: ttsApiKey ? 'configured-provider' : 'placeholder'
  };
};

module.exports = { synthesizeSpeech };
