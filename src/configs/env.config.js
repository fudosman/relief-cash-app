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
    verifySid: process.env.VERIFY_SID,
    myPhoneNumber: process.env.SMS_PHONE_NUMBER,
    jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
}