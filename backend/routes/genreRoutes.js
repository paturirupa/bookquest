const express = require("express");
const router = express.Router();
const User = require("../models/Genre");

router.post("/register", async (req, res) => {
  console.log("success");
});

module.exports = router;
