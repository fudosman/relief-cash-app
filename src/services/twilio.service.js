const twilio = require('twilio');

const accountSid = 'AC3c0080a3fbfb177996539b5d01aed495';
const authToken = '7776e3bdfa3cc1e822446490b46bad11';
const verifySid = 'VAdfa6e163f6b777d95fae04113e1406d7';

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

// Usage example
// (async () => {
//   const phoneNumber = '+2347067572151'; // Replace with the recipient's phone number

//   try {
//     await TwilioService.sendSMS(phoneNumber);
//     const otpCode = '123456'; // Replace with the actual OTP entered by the user
//     await TwilioService.checkOTP(phoneNumber, otpCode);
//   } catch (error) {
//     console.error(error.message);
//   }
// })();

module.exports = TwilioService;
