const express = require("express");
const router = express.Router();
const { user } = require('../controllers');
const { jwtService } = require('../services');
const { multer } = require("../middlewares");
const asyncHandler = require("express-async-handler");


router.get("/:userId/balance", user.getWalletBalance);

// router.post("/:userId/transactions", user.);
// router.post("/:userId/transactions/transactionId", user.);
// router.post("/:userId/bankAccount/:bankAccountId", user.);
// router.post("/:userId/bankAccount/:bankAccountId", user.);
// router.post("/:userId/notifications", user.);
// router.post("/:userId/notifications/:notificationId", user.);
// router.post("/:userId/loans", user.);
// router.post("/:userId/loans/:loanId", user.);


router.post("/verify/:customerId/merchant/:merchantId", user.verifyAndLoanOut);
router.put("/:userId/image", jwtService.protectRoute, multer, asyncHandler(user.uploadImage));
router.put("/:userId", jwtService.protectRoute, user.editProfile);

module.exports = router;

