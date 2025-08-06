const paymentConfig = {
    provider: 'Stripe', // Payment provider
    apiKey: process.env.STRIPE_API_KEY, // API key for the payment provider
    currency: 'USD', // Currency for transactions
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET, // Webhook secret for Stripe
    paymentMethods: [
        {
            name: 'Credit Card',
            supported: true,
        },
        {
            name: 'Debit Card',
            supported: true,
        },
        {
            name: 'PayPal',
            supported: true,
        },
        {
            name: 'Bank Transfer',
            supported: false,
        },
    ],
};

module.exports = paymentConfig;