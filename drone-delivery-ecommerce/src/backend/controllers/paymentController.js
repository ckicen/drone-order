const Payment = require('../models/Payment');
const Order = require('../models/Order');
const User = require('../models/User');
const { processPayment } = require('../config/payment');

// Create a new payment
exports.createPayment = async (req, res) => {
    try {
        const { orderId, paymentMethod, amount } = req.body;

        // Validate order existence
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Process payment
        const paymentResult = await processPayment(paymentMethod, amount);
        if (!paymentResult.success) {
            return res.status(400).json({ message: 'Payment failed', details: paymentResult.details });
        }

        // Save payment details to the database
        const payment = new Payment({
            orderId,
            userId: req.user.id,
            amount,
            paymentMethod,
            status: 'completed',
            transactionId: paymentResult.transactionId,
        });

        await payment.save();

        // Update order status
        order.status = 'paid';
        await order.save();

        res.status(201).json({ message: 'Payment successful', payment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get payment details by ID
exports.getPayment = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.status(200).json(payment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all payments for a user
exports.getUserPayments = async (req, res) => {
    try {
        const payments = await Payment.find({ userId: req.user.id });
        res.status(200).json(payments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};