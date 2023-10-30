module.exports = class AuthService {
  static async getUserById(userId) {
    try {

    } catch (error) {
      throw new Error(`Error getting user ${error.message}`);
    }
  }
  static async updateUser(userId, userData) {
    try {

    } catch (error) {
      throw new Error(`Error updating user by id ${error.message}`);
    }
  }
  static async changePassword(userId, newPassword) {
    try {

    } catch (error) {
      throw new Error(`Error changing password ${error.message}`);
    }
  }
  static async deleteUser(userId) {
    try {

    } catch (error) {
      throw new Error(`Error deleting user ${error.message}`);
    }
  }
  static async getReferrer(userId) {
    try {

    } catch (error) {
      throw new Error(`Error getting referrer ${error.message}`);
    }
  }
  static async getReferredUsers(userId) {
    try {

    } catch (error) {
      throw new Error(`Error getting referredUser ${error.message}`);
    }
  }
  static async checkLoanEligibility(userId) {
    try {

    } catch (error) {
      throw new Error(`Error checking Loan Eligibility: ${error.message}`);
    }
  }
  static async getLoanLimit(userId) {
    try {

    } catch (error) {
      throw new Error(`Error getting loan limit of user: ${error.message}`);
    }
  }
}