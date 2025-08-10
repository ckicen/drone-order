const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRegistration, validateLogin } = require('../middleware/validation');

// User Registration
router.post('/register', validateRegistration, authController.register);

// User Login
router.post('/login', validateLogin, authController.login);

// User Logout
router.post('/logout', authController.logout);

module.exports = router;