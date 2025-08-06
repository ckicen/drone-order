const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateUser, authorizeAdmin } = require('../middleware/auth');

// Get all users
router.get('/', authenticateUser, authorizeAdmin, userController.getAllUsers);

// Get a single user by ID
router.get('/:id', authenticateUser, userController.getUserById);

// Create a new user
router.post('/', userController.createUser);

// Update a user by ID
router.put('/:id', authenticateUser, userController.updateUser);

// Delete a user by ID
router.delete('/:id', authenticateUser, authorizeAdmin, userController.deleteUser);

module.exports = router;