const User = require("../models/user");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.jwtSecret;

const processSignUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      availCoins: 1000,
    });

    const token = jwt.sign({ userId: newUser.id }, SECRET_KEY);

    return res.status(201).json({
      message: "User registered successfully",
      token: token,
      userId: newUser.id,
      email: email,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
const processLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    return res
      .status(200)
      .json({ message: "login success", token, userId: user.id, email: email });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  processSignUp,
  processLogin,
};
