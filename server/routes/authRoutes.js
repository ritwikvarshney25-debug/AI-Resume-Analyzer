const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const sendOtp = require("../utils/sendOtp");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: "User Registered Successfully",
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      "mysecretkey",
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    user.resetOtp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;

    await user.save();

    await sendOtp(email, otp);

    res.json({
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.post("/verify-otp", async (req, res) => {
try {
const { email, otp } = req.body;

const user = await User.findOne({ email });

if (!user) {
  return res.status(404).json({
    message: "User not found",
  });
}

if (
  user.resetOtp !== otp ||
  user.otpExpiry < Date.now()
) {
  return res.status(400).json({
    message: "Invalid or Expired OTP",
  });
}

res.json({
  message: "OTP Verified",
});

} catch (error) {
res.status(500).json({
message: "Server Error",
});
}
});

router.post("/reset-password", async (req, res) => {
try {
const { email, otp, newPassword } = req.body;

const user = await User.findOne({ email });

if (!user) {
  return res.status(404).json({
    message: "User not found",
  });
}

  if (
  user.resetOtp !== otp ||
  user.otpExpiry < Date.now()
) {
  return res.status(400).json({
    message: "Invalid or Expired OTP",
  });
}

const hashedPassword = await bcrypt.hash(
  newPassword,
  10
);

user.password = hashedPassword;
user.resetOtp = undefined;
user.otpExpiry = undefined;

await user.save();

res.json({
  message: "Password Reset Successful",
});

} catch (error) {
res.status(500).json({
message: "Server Error",
});
}
});



module.exports = router;