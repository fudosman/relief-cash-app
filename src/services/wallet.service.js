const { Wallet } = require('../models');
class WalletService {

  static async createWallet(walletData) {
    try {
      const wallet = await Wallet.create(walletData);
      return wallet;
    } catch (error) {
      throw new Error(`Error creating wallet ${error.message}`);
    }
  }

  // Retrieve a user's wallet
  static async getWallet(userId) {
    try {
      // Implement logic to fetch the user's wallet
      const wallet = await WalletModel.findOne({ user: userId });
      return wallet;
    } catch (error) {
      throw new Error('Error getting wallet');
    }
  }

}

module.exports = WalletService;
