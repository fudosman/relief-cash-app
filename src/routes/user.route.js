const express = require("express");
const router = express.Router();
const { user } = require('../controllers');
const { jwtService } = require('../services');
const { multer } = require("../middlewares");
const asyncHandler = require("express-async-handler");


router.post("/register", jwtService.protectRoute, user.register);
router.post("/login", user.login);
router.post("/verify/:customerId/merchant/:merchantId", user.verifyAndLoanOut);
router.put("/image", jwtService.protectRoute, multer, asyncHandler(user.uploadImage));
router.put("/:userId", jwtService.protectRoute, user.editProfile);

module.exports = router;

