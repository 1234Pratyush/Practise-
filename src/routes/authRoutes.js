const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../Controllers/authController");

router.get("/register", (req, res) => res.render("register"));
router.post("/register", registerUser);
router.get("/sign-in", (req, res) => res.render("signin")); // lowercase
router.post("/sign-in", loginUser);
router.get("/logout", logoutUser);

module.exports = router;
