module.exports = class AuthService {
  static async getUserById(userId) {
    try {

    } catch (error) {
      throw new Error(`Error getting user by id ${userId}`);
    }
  }
  static async updateUser(userId, userData) {
    try {

    } catch (error) {
      throw new Error(`Error updating user by id ${userId}`);
    }
  }
  static async changePassword(userId, newPassword) {
    try {

    } catch (error) {
      throw new Error(`Error changing password of user ${userId}`);
    }
  }
  static async deleteUser(userId) {
    try {

    } catch (error) {
      throw new Error(`Error deleting user by id ${userId}`);
    }
  }
  static async getReferrer(userId) {
    try {

    } catch (error) {
      throw new Error(`Error getting referrer by id ${userId}`);
    }
  }
  static async getReferredUsers(userId) {
    try {

    } catch (error) {
      throw new Error(`Error getting referredUser by id ${userId}`);
    }
  }
  static async checkLoanEligibility(userId) {
    try {

    } catch (error) {
      throw new Error(`Error checking Loan Eligibility of user ${userId}`);
    }
  }
  static async getLoanLimit(userId) {
    try {

    } catch (error) {
      throw new Error(`Error getting loan limit of user ${userId}`);
    }
  }
}