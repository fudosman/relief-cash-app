require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    dbUrl: process.env.MONGO_URL,
    accountSid: process.env.ACCOUNT_SID,
    apiKeySecret: process.env.AUTHENTICATION_TOKEN,
    verifySid: process.env.VERIFY_SID,
    myPhoneNumber: process.env.SMS_PHONE_NUMBER,
    jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
    cloudinary_name: process.env.CLOUDINARY_API_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
    TRB_API_KEY: process.env.TREBLLE_API_KEY,
    TRB_PROJ_ID: process.env.TREBLLE_PROJECT_ID,
}