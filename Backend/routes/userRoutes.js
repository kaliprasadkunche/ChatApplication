// backend/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model

// Route to fetch all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude the password field
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = router;
