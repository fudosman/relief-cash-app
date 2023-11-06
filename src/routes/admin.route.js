const express = require("express");
const router = express.Router();
const { admin } = require('../controllers');
const { jwtService } = require('../services');

// Loans
router.get("/loans", jwtService.protectRoute, jwtService.isAdmin, admin.viewAllLoans);
router.get("/loans/:loanId", jwtService.protectRoute, jwtService.isAdmin, admin.viewLoan);
router.put("/loans/:loanId", jwtService.protectRoute, jwtService.isAdmin, admin.updateLoan);

// Users
router.get("/users", jwtService.protectRoute, jwtService.isAdmin, admin.viewAllUsers);
router.get("/users/:userId", jwtService.protectRoute, jwtService.isAdmin, admin.viewUser);

module.exports = router;