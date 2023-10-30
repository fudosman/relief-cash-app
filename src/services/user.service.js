module.exports = class UserService {
  registerUser(userData) {
    try {

    } catch (error) {
      throw new Error(`Error registering new user`);
    }
  }
  authenticateUser(credentials) {
    try {

    } catch (error) {
      throw new Error(`Error loggin in user`);
    }
  }
  generateOTP(userId) {
    try {

    } catch (error) {
      throw new Error(`Error genetating otp for user ${userId}`);
    }
  }
  sendOTP(userId, phoneNumber, otp) {
    try {

    } catch (error) {
      throw new Error(`Error sending one time password OTP`);
    }
  }
  verifyOTP(userId, enteredOTP) {
    try {

    } catch (error) {
      throw new Error(`Error verifying user one time password OTP`);
    }
  }
}