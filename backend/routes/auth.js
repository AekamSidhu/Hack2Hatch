const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    console.error("❌ Registration Error:", err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    try {
      console.log("📩 Login Request:", req.body); // Debug request

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors.array() });
      }

      const { email, password } = req.body;
      let user = await User.findOne({ email });

      if (!user) {
        console.log("❌ User Not Found");
        return res.status(400).json({ success: false, message: 'Invalid credentials' });
      }

      if (!user.password) {
        console.log("❌ Password field is missing in database!");
        return res.status(500).json({ success: false, message: 'Server Error: Password field missing' });
      }

      // ✅ Compare password securely
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("❌ Password Mismatch");
        return res.status(400).json({ success: false, message: 'Invalid credentials' });
      }

      sendTokenResponse(user, 200, res);
    } catch (err) {
      console.error("❌ Login Error:", err);
      res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
  }
);

// Function to send JWT token response
const sendTokenResponse = (user, statusCode, res) => {
  const payload = { user: { id: user.id } };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: '7d' },
    (err, token) => {
      if (err) throw err;
      res.status(statusCode).json({
        success: true,
        token,
      });
    }
  );
};

module.exports = router;
