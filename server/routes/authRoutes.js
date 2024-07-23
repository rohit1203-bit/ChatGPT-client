const express = require("express");
const {
  registerContoller,
  loginController,
  logoutController,
  getuserId
} = require("../controllers/authController");

const router = express.Router();

router.get("/", getuserId);
router.post("/register", registerContoller);
router.post("/login", loginController);
router.post("/logout", logoutController);


module.exports = router;