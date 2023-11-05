const express = require("express");
const router = express.Router();
const { user } = require('../controllers');
const { jwtService } = require('../services');

router.post("/register", jwtService.protectRoute, user.register);
router.post("/login", user.login);
router.post("/verify/:customerId/merchant/:merchantId", user.verifyAndLoanOut);

module.exports = router;

