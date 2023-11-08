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

}

module.exports = BankAccountService;
