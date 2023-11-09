const express = require("express");
const router = express.Router();
const { user } = require('../controllers');
const { jwtService } = require('../services');
const { multer } = require("../middlewares");
const asyncHandler = require("express-async-handler");

// dashboard
router.get("/:userId", jwtService.protectRoute, user.getUser);
router.get("/:userId/balance", jwtService.protectRoute, user.getWalletBalance);

router.post("/:userId/loans", jwtService.protectRoute, user.loanStepsOne);
router.get("/:userId/loans", jwtService.protectRoute, user.getUserLoans);
router.get("/:userId/loans/:loanId", jwtService.protectRoute, user.getSingleUserLoan);
router.put("/:userId/loans/:loanId", jwtService.protectRoute, user.loanStepsTwo);
router.put("/:userId/loans/:loanId/verify", jwtService.protectRoute, user.loanStepsThree);

router.get("/:userId/transactions", jwtService.protectRoute, user.getTransactions);

router.put("/:userId", jwtService.protectRoute, user.editProfile);
router.put("/:userId/image", jwtService.protectRoute, multer, asyncHandler(user.uploadImage));
router.post("/verify/:customerId/merchant/:merchantId", user.verifyAndLoanOut);

// loans 
// router.post("/:userId/bankAccounts", jwtService.protectRoute, user.getBankAccounts);
// router.post("/:userId/bankAccount/:bankAccountId", jwtService.protectRoute, user.getSingleBankAccount);

// router.post("/:userId/notifications", user.getNotifications);
// router.post("/:userId/notifications/:notificationId", user.getSingleNotification);

// router.post("/:userId/loans/:loanId", user.getSingleLoan);
// router.post("/:userId/transactions/:transactionId", jwtService.protectRoute, user.getSingleTransaction);




module.exports = router;

