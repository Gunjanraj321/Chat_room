const User = require("../models/User");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const processSignUp = async (req, res) => {
  const { name, phone, password } = req.body;
  console.log(name, phone, password); // Logging received data for debugging
  try {
    if (!name || !phone || !password) {
      return res.status(400).json({
        error: "missing required fields",
      });
    }
    
    const existingUser = await User.findOne({ where: { phone } });
    if (existingUser) {
      return res.status(409).json({ error: "phone is already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword); // Logging hashed password for debugging

    const newUser = await User.create({
      name,
      phone,
      password: hashedPassword,
    });
    console.log(newUser); // Logging the newly created user for debugging
    console.log(process.env.jwtSecret)
    const token = jwt.sign({ userId: newUser.id }, process.env.jwtSecret);

    res.status(201).json({
      message: "registration successful.",
      token: token,
    });
  } catch (err) {
    console.log("error during sign-up:", err); // Log the error for debugging
    res.status(500).json({
      error: "an error occurred while registering the user",
    });
  }
};

const processLogin = async (req, res) => {
  const { phone, password } = req.body;

  try {
    const user = await User.findOne({ where: { phone } });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    const token = jwt.sign({ userId: user.id }, process.env.jwtSecret);

    if (passwordMatch) {
      console.log("password match");
      res.status(200).json({ message: "login successfully", token });
    } else {
      console.log("password not match");
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "An error occurred while processing the login" });
  }
};

module.exports = {
  processSignUp,
  processLogin,
};
