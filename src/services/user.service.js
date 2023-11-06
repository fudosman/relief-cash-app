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

  static async fetchAllUsers(data) {
    try {
      const users = await User.find(data);
      return users
    } catch (error) {
      throw new Error(" Error Fetching All Users: " + error.message);
    }
  }

}

module.exports = UserService;
