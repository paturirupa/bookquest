const express = require("express");
const { saveUser, loginUser } = require("../controllers/authController");

const router = express.Router();

router.post("/register", saveUser);
router.post("/login", loginUser);

module.exports = router;