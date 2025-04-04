const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a new user
router.post('/users', userController.createUser);

// Get all users
router.get('/users', userController.getAllUsers);

// Get a single user by ID
router.get('/users/:id', userController.getUserById);

// Login user
router.post('/login', userController.login);

// Update user profile
router.put('/users/:id', userController.updateUser);

// Update user password
router.put('/users/:id/password', userController.updatePassword);

// Verify user information
router.post('/users/verify', userController.verifyUser);

module.exports = router; 