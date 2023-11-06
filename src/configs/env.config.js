require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    dbUrl: process.env.MONGO_URL,
    accountSid: process.env.ACCOUNT_SID,
    apiKeySecret: process.env.AUTHENTICATION_TOKEN,
    verifySid: process.env.VERIFY_SID,
    myPhoneNumber: process.env.SMS_PHONE_NUMBER,
    jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
}