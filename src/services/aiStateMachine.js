const HUMAN_TRANSFER_KEYWORDS = ['human', 'agent', 'representative', 'operator'];

const nextState = ({ state, utterance }) => {
  const normalized = (utterance || '').toLowerCase();
  const wantsHuman = HUMAN_TRANSFER_KEYWORDS.some((keyword) => normalized.includes(keyword));

  if (wantsHuman) {
    return { state: 'transfer_human', intent: 'human_transfer' };
  }

  switch (state) {
    case 'greeting':
      return { state: 'collect_intent', intent: 'collect_reason' };
    case 'collect_intent':
      return { state: 'book_appointment', intent: 'book_appointment' };
    case 'book_appointment':
      return { state: 'confirm_appointment', intent: 'confirm_appointment' };
    case 'confirm_appointment':
      return { state: 'end', intent: 'end_call' };
    default:
      return { state: 'greeting', intent: 'start' };
  }
};

const generateResponse = ({ state, patientName }) => {
  switch (state) {
    case 'greeting':
      return `Namaste ${patientName || 'ji'}, main aapki sahayata ke liye hoon. Aapko kis cheez mein madad chahiye?`;
    case 'collect_intent':
      return 'Aap appointment book karna chahte hain ya report ke baare mein baat karni hai?';
    case 'book_appointment':
      return 'Kripya appointment ke liye apni pasand ki tareekh aur samay batayein.';
    case 'confirm_appointment':
      return 'Theek hai, main appointment confirm kar rahi hoon.';
    case 'transfer_human':
      return 'Aapko human agent se connect kiya ja raha hai.';
    case 'end':
      return 'Dhanyavaad! Aapka din shubh ho.';
    default:
      return 'Main aapki sahayata ke liye hoon.';
  }
};

module.exports = { nextState, generateResponse };
