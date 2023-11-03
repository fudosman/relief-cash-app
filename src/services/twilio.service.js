const twilio = require('twilio');
const { accountSid, apiKeySecret, verifySid } = require("../configs").env;

const authToken = apiKeySecret;
class TwilioService {
  static async sendSMS(phoneNumber) {
    const client = twilio(accountSid, authToken);

    try {
      const verification = await client.verify.v2.services(verifySid)
        .verifications.create({ to: phoneNumber, channel: 'sms' });

      console.log(verification.status);
    } catch (error) {
      throw new Error(`Error sending SMS verification: ${error.message}`);
    }
  }

  static async checkOTP(phoneNumber, otpCode) {
    const client = twilio(accountSid, authToken);

    try {
      const verificationCheck = await client.verify.v2.services(verifySid)
        .verificationChecks.create({ to: phoneNumber, code: otpCode });

      console.log(verificationCheck.status);
    } catch (error) {
      throw new Error(`Error checking OTP: ${error.message}`);
    }
  }
}

module.exports = TwilioService;
