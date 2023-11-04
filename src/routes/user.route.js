const express = require("express");
const router = express.Router();
const { user } = require('../controllers');

router.post("/register", user.register);
router.post("/login", user.login);
router.post("/verify:customerId/merchant:merchantId", user.verifyAndLoanOut);

module.exports = router;

