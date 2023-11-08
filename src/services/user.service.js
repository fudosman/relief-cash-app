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

  static async setProfilePicture(userId, picture) {
    try {
      let user = await User.findOne({ _id: userId });
      user.profilePicture = picture;
      const savedUser = await user.save();
      return savedUser;
    } catch (error) {
      throw new Error(" Error Setting Profile Picture: " + error.message);
    }
  }

  static async updateBasicDetails(userId, profileData) {
    try {
      let updatedUser = await User.findOneAndUpdate({ _id: userId }, profileData, { new: true });
      return updatedUser
    } catch (error) {
      throw new Error(" Error updating basic profile details: " + error.message);
    }
  }

  static async updateUser(userId, updatedUserData) {
    try {
      let updatedUser = await User.findOneAndUpdate({ _id: userId }, updatedUserData, { new: true });
      return updatedUser
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  static async fetchUserWithTransactions(userId) {
    try {
      let user = await User.findOne({ _id: userId }).populate('transactions');
      return user;
    } catch (error) {
      throw new Error(`Error fetching user transactions: ${error.message}`);
    }
  }

}

module.exports = UserService;
