const { googleCalendarApiKey } = require('../config/env');

const createCalendarEvent = async ({ summary, start, end }) => {
  if (!googleCalendarApiKey) {
    return { status: 'skipped', reason: 'Google Calendar API key missing' };
  }

  return {
    status: 'placeholder',
    summary,
    start,
    end
  };
};

module.exports = { createCalendarEvent };
