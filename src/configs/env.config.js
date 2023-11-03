require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
    firstName: process.env.FIRST_NAME,
    lastName: process.env.LAST_NAME,
    phoneNumber: process.env.PHONE_NUMBER,
    homeAddress: process.env.HOME_ADDRESS,
    dbUrl: process.env.MONGO_URL,
    accountSid: process.env.ACCOUNT_SID,
    apiKeySecret: process.env.AUTHENTICATION_TOKEN,
    twilioApiKey: process.env.TWILIO_API_KEY,
    myPhoneNumber: process.env.SMS_PHONE_NUMBER,
}