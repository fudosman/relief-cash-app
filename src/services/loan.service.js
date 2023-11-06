const { Loan } = require('../models');
class LoanService {
  static async createLoan(data) {
    try {
      const newLoan = new Loan(data);
      const loan = await newLoan.save();
      return loan;
    } catch (error) {
      throw new Error(`Error creating loan: ${error.message}`);
    }
  }

  static async fetchAllLoans(data) {
    try {
      const allLoans = await Loan.find(data);
      return allLoans;
    } catch (error) {
      throw new Error(`Error fetching all loan: ${error.message}`);
    }
  }

  static async fetchLoan(loanId) {
    try {
      const loan = await Loan.findOne({ _id: loanId });
      return loan;
    } catch (error) {
      throw new Error(`Error fetching loan: ${error.message}`);
    }
  }

  static async updateLoan(loanId, data) {
    try {
      const updatedLoan = await Loan.findOneAndUpdate({ _id: loanId }, data, { new: true });
      return updatedLoan;
    } catch (error) {
      throw new Error(`Error fetching loan: ${error.message}`);
    }
  }
}

module.exports = LoanService;
