const bcrypt = require('bcryptjs');  // Import bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Import jwt for token generation
const User = require('../models/User'); // Import the User model

const authService = {
  // Register a new user
  async registerUser(newUser) {
    try {
      // Hash the user's password before saving it to the database
      const hashedPassword = await bcrypt.hash(newUser.password, 10);
      newUser.password = hashedPassword;
      const user = new User(newUser);
      await user.save(); // Save the new user to the database
      return user; // Return the created user
    } catch (error) {
      throw error; // Throw any errors that occur during registration
    }
  },

  // Log in a user and generate a JWT token
  async loginUser(credentials) {
    try {
      const user = await User.findOne({ email: credentials.email }); // Find the user by email
      if (!user) {
        throw new Error('User not found'); // Handle user not found
      }

      const passwordMatch = await bcrypt.compare(
        credentials.password,
        user.password
      );
      if (!passwordMatch) {
        throw new Error('Incorrect password'); // Handle incorrect password
      }

      // Generate a JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } // Adjust the expiration time as needed
      );

      return token; // Return the generated JWT token
    } catch (error) {
      throw error; // Throw any errors that occur during login
    }
  },
};

module.exports = authService; // Export the authService object for use in other parts of the application
