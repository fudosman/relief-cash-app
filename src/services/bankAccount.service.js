const { BankAccount } = require('../models');
class BankAccountService {
  static async createBankAccount(data) {
    try {
      const bankAccount = await BankAccount.create(data);
      return bankAccount;
    } catch (error) {
      throw new Error('Error creating bank account');
    }
  }

  // Link a bank account to a user
  static async linkBankAccount(userId, bankAccountData) {
    try {
      // Implement logic to associate a bank account with the user
      const bankAccount = await BankAccountModel.create({ ...bankAccountData, user: userId });
      return bankAccount;
    } catch (error) {
      throw new Error('Error linking bank account to user');
    }
  }

  // Verify a bank account linked to a user
  static async verifyBankAccount(userId, bankAccountId) {
    try {
      // Implement logic to verify a bank account associated with the user
      const bankAccount = await BankAccountModel.findOne({ _id: bankAccountId, user: userId });
      if (!bankAccount) {
        throw new Error('Bank account not found for the user');
      }
      return bankAccount;
    } catch (error) {
      throw new Error('Error verifying bank account');
    }
  }
}

module.exports = BankAccountService;
