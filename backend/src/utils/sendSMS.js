const twilio = require('twilio');

const sendSMS = async (to, message) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromPhone = process.env.TWILIO_PHONE_NUMBER;

  if (!accountSid || !authToken || !fromPhone || accountSid === 'your_twilio_sid') {
    console.warn('[Twilio SMS Warning] Twilio credentials not configured in .env. Skipping SMS.');
    console.log(`[Mock SMS to ${to}]: ${message}`);
    return false;
  }

  try {
    const client = twilio(accountSid, authToken);
    const response = await client.messages.create({
      body: message,
      from: fromPhone,
      to,
    });
    console.log(`[Twilio SMS] Message sent successfully to ${to}. SID: ${response.sid}`);
    return true;
  } catch (error) {
    console.error(`[Twilio SMS Error] Failed to send to ${to}:`, error.message);
    return false;
  }
};

module.exports = sendSMS;
