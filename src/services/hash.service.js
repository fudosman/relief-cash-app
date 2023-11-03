const bcrypt = require('bcryptjs');
class HashService {
  static async hashPassword(password) {
    try {
      const hashedPassword = await bcrypt.hashSync(password);
      return hashedPassword;
    } catch (error) {
      throw new Error(`Error hashing user password: ${error.message}`);
    }
  }

  static async verifyPassword(hashedPassword, password) {
    try {
      const isPasswordValid = await bcrypt.compare(password, hashedPassword);
      return isPasswordValid;
    } catch (error) {
      throw new Error(`Error verifying user password: ${error.message}`);
    }
  }
}

module.exports = HashService;
