// Import your Agent model
const { User } = require('../models');
class UserService {
  // Register a new user
  static async registerUser(userData) {
    try {
      // Implement logic to register a new user with the provided data
      const newUser = await User.create(userData);
      return newUser;
    } catch (error) {
      throw new Error('Error registering new user: ' + error.message);
    }
  }

  static async fetchUser(userId) {
    try {
      const newUser = await User.findOne({ _id: userId });
      return newUser
    } catch (error) {
      throw new Error(" Error fetching user: " + error.message);
    }
  }

  static async fetchUserByEmail(email) {
    try {
      const newUser = await User.findOne({ email: email });
      return newUser
    } catch (error) {
      throw new Error(" Error fetching User by Email: " + error.message);
    }
  }

  // Generate OTP for a user
  static async generateOTP(userId) {
    try {
      // Implement logic to generate an OTP for the user
      return generatedOTP;
    } catch (error) {
      throw new Error(`Error generating OTP for user ${userId}`);
    }
  }


  // Verify a user with the provided verification data
  static async verifyUser(userId, verificationData) {
    try {
      // Implement logic to verify a user with the provided data
      const user = await UserModel.findByIdAndUpdate(userId, verificationData, { new: true });
      return user;
    } catch (error) {
      throw new Error('Error verifying user');
    }
  }

  // Verify an agent's bank account
  static async verifyAgentBankAccount(agentId) {
    try {
      // Implement logic to verify the bank account of an agent
      const agent = await AgentModel.findByIdAndUpdate(agentId, { isBankAccountVerified: true }, { new: true });
      return agent;
    } catch (error) {
      throw new Error('Error verifying agent bank account');
    }
  }



  // Accept terms and conditions for an agent
  static async acceptTermsAndConditions(agentId) {
    try {
      // Implement logic to record that an agent has accepted the terms and conditions
      const agent = await AgentModel.findByIdAndUpdate(agentId, { hasAcceptedTerms: true }, { new: true });
      return agent;
    } catch (error) {
      throw new Error('Error accepting terms and conditions');
    }
  }

  // Check the credit rating of a user
  static async checkCreditRating(userId) {
    try {
      // Implement logic to check the credit rating of the user
      return creditRating;
    } catch (error) {
      throw new Error('Error checking credit rating');
    }
  }
}

module.exports = UserService;
