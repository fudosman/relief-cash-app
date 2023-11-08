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
  static async getWallet(walletId) {
    try {
      const wallet = await Wallet.findOne({ _id: walletId });
      return wallet;
    } catch (error) {
      throw new Error('Error getting wallet');
    }
  }

}

module.exports = WalletService;
