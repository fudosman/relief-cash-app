const express = require("express");
const router = express.Router();
const { money } = require('../controllers');

router.post("/send", money.sendQrCode);
router.post("/accept", money.scanQrCode);

module.exports = router;
