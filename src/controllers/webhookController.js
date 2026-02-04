const { transcribeAudio } = require('../services/sttService');
const { synthesizeSpeech } = require('../services/ttsService');
const { nextState, generateResponse } = require('../services/aiStateMachine');
const {
  findOrCreatePatient,
  scheduleMissedCallCallback
} = require('../services/callService');
const { sendWhatsAppConfirmation, sendSmsConfirmation } = require('../services/notificationService');
const { createCalendarEvent } = require('../services/calendarService');

const handleIncomingCall = async (req, res) => {
  try {
    const { callId, from, audioUrl, state = 'greeting', name } = req.body;

    const patient = await findOrCreatePatient({ phoneNumber: from, name });

    const transcript = await transcribeAudio({ audioUrl, language: patient.preferredLanguage });
    const stateResult = nextState({ state, utterance: transcript.text });
    const responseText = generateResponse({ state: stateResult.state, patientName: patient.name });

    if (stateResult.intent === 'confirm_appointment') {
      await createCalendarEvent({
        summary: `Appointment for ${patient.name}`,
        start: new Date(Date.now() + 60 * 60 * 1000),
        end: new Date(Date.now() + 2 * 60 * 60 * 1000)
      });

      const confirmationMessage = 'Aapka appointment request mil gaya hai. Hum jaldi confirm karenge.';
      await sendWhatsAppConfirmation({ to: patient.phoneNumber, message: confirmationMessage });
      await sendSmsConfirmation({ to: patient.phoneNumber, message: confirmationMessage });
    }

    const tts = await synthesizeSpeech({ text: responseText });

    return res.json({
      callId,
      patientId: patient.id,
      transcript,
      nextState: stateResult.state,
      responseText,
      ttsAudioUrl: tts.audioUrl,
      transferToHuman: stateResult.intent === 'human_transfer'
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const handleCallStatus = async (req, res) => {
  try {
    const { status, from, to } = req.body;

    if (status === 'missed') {
      const callback = scheduleMissedCallCallback({ phoneNumber: from, fromNumber: to });
      return res.json({ status: 'callback_scheduled', callback });
    }

    return res.json({ status: 'received' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { handleIncomingCall, handleCallStatus };
