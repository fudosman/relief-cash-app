const express = require("express");
const router = express.Router();
const { merchant } = require("../controllers");
const { jwtService } = require("../services");

// Users
router.post("/merchant/register", merchant.register);
router.post("/merchant/login", merchant.login);
router.post("/merchant/complete-registration", jwtService.protectRoute, merchant.bankAccount);
router.post("/merchant/newaccount", jwtService.protectRoute, merchant.addNewAccount);

module.exports = router;