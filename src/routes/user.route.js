const express = require("express");
const router = express.Router();
const { user } = require('../controllers');
const { protect } = require('../middlewares/auth');

router.post("/", user.register);
router.post("/login", user.login);
router.get("/", protect ,user.getAllUsers);
router.delete("/",protect ,user.deleteAllUsers);


router.get("/:userId",protect, user.getUserById);
router.put("/:userid", protect ,user.updateUserById);
router.delete("/:userId", protect, user.deleteUserById);

module.exports = router;
