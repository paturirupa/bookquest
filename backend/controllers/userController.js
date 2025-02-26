const userModel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const saveUser = async (req, res) => {
  const { username, email, password, age } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      res.status(409).send({ message: "user already exists !" });
    }

    if (!isvalidUsername(username)) {
      return res
        .status(400)
        .send({ message: "Username must be at least 8 characters." });
    }

    if (!validateEmail(email)) {
      return res.status(400).send({ message: "Invalid email format!" });
    }
    // if (password != confirmPassword) {
    //   res.status(400).send({ message: "Password donot match !" });
    // }
    const passwordValidation = validation(password);
    if (!passwordValidation.isValid) {
      res.status(400).send({
        message:
          "Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //const age = calculateAge(dob);

    const user = await userModel.create({
      username,
      email,
      hashedPassword,
      age,
    });

    user.save();
    res.status(201).json({ message: "User registration successfully !" });
  } catch (err) {
    console.error(err);
    res.status(404).send("false");
  }
};

const validation = (password) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return {
      isValid: false,
      message:
        "Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.",
    };
  }
  return { isValid: true };
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isvalidUsername = (username) => {
  console.log(username.length);
  return username.length >= 8;
};

const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const diff = Date.now() - birthDate.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

module.exports = {
  saveUser,
};
