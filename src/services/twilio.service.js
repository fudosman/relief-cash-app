const twilio = require('twilio');
const { accountSid, apiKeySecret, verifySid, myPhoneNumber } = require("../configs").env;

const authToken = apiKeySecret;
class TwilioService {
  static async sendSMS() {
    const client = twilio(accountSid, authToken, { timeout: 90000 });

    try {
      const verification = await client.verify.v2.services(verifySid)
        .verifications.create({ to: myPhoneNumber, channel: 'sms' });

      // console.log(verification.status);
    } catch (error) {
      throw new Error(`Error sending SMS verification: ${error.message}`);
    }
  }

  static async checkOTP(otpCode) {
    const client = twilio(accountSid, authToken, { timeout: 90000 });

    try {
      const verificationCheck = await client.verify.v2.services(verifySid)
        .verificationChecks.create({ to: myPhoneNumber, code: otpCode });

      return verificationCheck.status;
    } catch (error) {
      throw new Error(`Error checking OTP: ${error.message}`);
    }
  }
}

module.exports = TwilioService;
