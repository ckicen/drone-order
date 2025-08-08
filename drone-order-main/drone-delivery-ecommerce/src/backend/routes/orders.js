const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticateUser, authorizeAdmin } = require('../middleware/auth');

// Create a new order
router.post('/', authenticateUser, orderController.createOrder);

// Get all orders (Admin only)
router.get('/', authorizeAdmin, orderController.getAllOrders);

// Get a specific order by ID
router.get('/:orderId', authenticateUser, orderController.getOrderById);

// Update an order status (Admin only)
router.put('/:orderId', authorizeAdmin, orderController.updateOrderStatus);

// Delete an order (Admin only)
router.delete('/:orderId', authorizeAdmin, orderController.deleteOrder);

module.exports = router;