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

  static async fetchBankAccount(accountId) {
    try {
      const bankAccount = await BankAccount.findOne({ _id: accountId });
      return bankAccount;
    } catch (error) {
      throw new Error('Error fetching bank account');
    }
  }

  static async updateBankAccountDetails(bankAccountId, bankAccountData) {
    try {
      let updatedBankAccount = await BankAccount.findOneAndUpdate({ _id: bankAccountId }, bankAccountData, { new: true });
      return updatedBankAccount
    } catch (error) {
      throw new Error(`Error updating bank account details: ${error.message}`);
    }
  }

}

module.exports = BankAccountService;
