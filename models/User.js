const mongoose = require('mongoose');// Import the Mongoose library for schema creation
const bcrypt = require('bcryptjs');// Import bcrypt for password hashing

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true, // First name is required
  },
  lastName: {
    type: String,
    required: true, // Last name is required
  },
  email: {
    type: String,
    unique: true,   // Email should be unique in the database
    required: true, // Email is required
  },
  password: {
    type: String,
    required: true, // Password is required
  }
});

// Hash the user's password before saving it to the database
userSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) { // Check if the password field is modified
      const salt = await bcrypt.genSalt(10);// Generate a salt
      this.password = await bcrypt.hash(this.password, salt); // Hash the password with the salt
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Compare a given password with the stored hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema); // Create the User model using the schema

module.exports = User; // Export the User model for use in other parts of the application
