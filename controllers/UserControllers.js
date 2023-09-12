const User = require('../models/User'); // Import the User model
const bcrypt = require('bcryptjs');     // Import bcrypt for password hashing
const jwt = require('jsonwebtoken');   // Import jwt for token generation

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const newUser = new User({ firstName, lastName, email, password });
    const user = await newUser.save(); // Save the new user to the database
    res.status(201).json(user); // Respond with the created user
  } catch (err) {
    res.status(400).json({ error: err.message }); // Handle errors
  }
};

// Retrieve all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Find all users in the database
    res.json(users); // Respond with the list of users
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle errors
  }
};

// Retrieve a specific user by ID
exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId); // Find a user by their ID
    if (!user) {
      res.status(404).json({ message: 'User not found' }); // Handle user not found
    } else {
      res.json(user); // Respond with the found user
    }
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle errors
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, { firstName, lastName, email, password }, { new: true }); // Update a user by their ID
    if (!user) {
      res.status(404).json({ message: 'User not found' }); // Handle user not found
    } else {
      res.json(user); // Respond with the updated user
    }
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle errors
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByIdAndRemove(userId); // Delete a user by their ID
    if (!user) {
      res.status(404).json({ message: 'User not found' }); // Handle user not found
    } else {
      res.json({ message: 'User deleted' }); // Respond with a success message
    }
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle errors
  }
};

// Log in a user and return a JWT token
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }); // Find the user by email

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' }); // Handle authentication failure
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); // Compare provided password with hashed password

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Authentication failed' }); // Handle authentication failure
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expires in 1 hour (adjust as needed)
    });

    // Return the token in the response
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors
  }
};
