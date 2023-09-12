// Import necessary packages and modules
const express = require('express');        // Import the Express.js framework
const mongoose = require('mongoose');      // Import Mongoose for MongoDB interactions
const bodyParser = require('body-parser'); // Middleware for parsing JSON request bodies
const userRoutes = require('./routes/UserRoutes'); // Import user-related routes

// Load environment variables from a .env file
require('dotenv').config();

// Create an Express application
const app = express();
const port = process.env.PORT || 3000; // Set the server port to either the environment variable PORT or default to 3000 if not defined

// Extract the MongoDB URI from environment variables
const { MONGODB_URI } = process.env;

// Connect to MongoDB using Mongoose
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,       // Use the new URL parser
  useUnifiedTopology: true,    // Use the new Server Discovery and Monitoring engine
});

const db = mongoose.connection;

// Event listener for MongoDB connection errors
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Event listener for successful MongoDB connection
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Define routes for handling user-related requests
app.use('/api/users', userRoutes);

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
