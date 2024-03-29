const { userService, loanService } = require('../services');

const viewAllUsers = async function (req, res) {
  try {
    const data = {};
    const allUsers = await userService.fetchAllUsers(data);
    return res.status(200).json({
      success: true,
      message: "fetched all users",
      allUsers: allUsers
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const viewUser = async function (req, res) {
  try {
    const userId = req.params.userId;
    const user = await userService.fetchUser(userId);
    return res.status(200).json({
      success: true,
      message: "user successfully fetched",
      user: user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const viewAllLoans = async function (req, res) {
  try {
    const data = {};
    const allLoans = await loanService.fetchAllLoans(data);
    return res.status(200).json({
      success: true,
      message: "fetched all loans successfully",
      allLoans: allLoans
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const viewLoan = async function (req, res) {
  try {
    const loanId = req.params.loanId;
    const loan = await loanService.fetchLoan(loanId);
    return res.status(200).json({
      success: true,
      message: "fetched loan successfully",
      loan: loan
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const updateLoan = async (req, res) => {
  try {
    const { status, amount, rejectReason, referralCode, knowingDuration } = req.query;
    const messages = [];
    const loanId = req.params.loanId;
    let loanData = {};
    const currentUser = req.user;
    const loanAgent = await loanService.fetchLoan(loanId);

    if (status) {
      const statusMessages = {
        approved: "Your account has been approved",
        rejected: "Your account has been rejected",
        repaid: "Your loan has been repaid",
      };

      if (status === "approved") {
        // check the customers credit score
        // check the merchants ability to disburse the loan
        // create the transaction
        // create notification
      }

      if (status === "rejected") {
        // add the rejection reason
        // create notiication
      }

      if (status === "repaid") {
        // calculate the customers credit score
        // calculate the merchants risk rating
        // create the transaction
        // create notification
      }

      loanData.status = status;
      messages.push(statusMessages[status] || '');
    }

    if (amount) {
      loanData.amount = amount;
      messages.push("Your amount has been updated successfully");
    }

    if (rejectReason) {
      loanData.rejectReason = rejectReason;
      messages.push("Reject reason has been updated");
    }

    if (referralCode) {
      loanData.referralCode = referralCode;
      messages.push("Referral code updated successfully");
    }

    if (knowingDuration) {
      loanData.knowingDuration = knowingDuration;
      messages.push("Knowing Duration updated successfully");
    }

    const updatedLoan = await loanService.updateLoan(loanId, loanData)

    const message = messages.join(", ");

    return res.status(200).json({
      success: true,
      message,
      updatedLoan
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  viewAllUsers,
  viewUser,
  viewAllLoans,
  viewLoan,
  updateLoan,
};