const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { authenticateUser } = require('../middleware/auth');

// Route to initiate a payment
router.post('/initiate', authenticateUser, paymentController.initiatePayment);

// Route to handle payment confirmation
router.post('/confirm', authenticateUser, paymentController.confirmPayment);

// Route to get payment status
router.get('/status/:orderId', authenticateUser, paymentController.getPaymentStatus);

module.exports = router;