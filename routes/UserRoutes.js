const express = require('express');// Import the Express.js framework
const router = express.Router();// Create an instance of an Express Router
const userController = require('../controllers/UserControllers'); // Import the user controller

// Create a new user (HTTP POST request to /api/users/)
router.post('/', userController.createUser);

// Retrieve all users (HTTP GET request to /api/users/)
router.get('/', userController.getAllUsers);

// Retrieve a specific user by ID (HTTP GET request to /api/users/:id)
router.get('/:id', userController.getUserById);

// Update a user by ID (HTTP PUT request to /api/users/:id)
router.put('/:id', userController.updateUser);

// Delete a user by ID (HTTP DELETE request to /api/users/:id)
router.delete('/:id', userController.deleteUser);

// Login a user (HTTP POST request to /api/users/login)
router.post('/login', userController.login);

module.exports = router; // Export the router for use in other parts of the application
