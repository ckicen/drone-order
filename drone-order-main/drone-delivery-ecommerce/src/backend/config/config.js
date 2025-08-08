module.exports = {
    PORT: process.env.PORT || 5000,
    DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost:27017/drone_delivery_ecommerce',
    JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h',
    PAYMENT_GATEWAY: {
        API_KEY: process.env.PAYMENT_API_KEY || 'your_payment_api_key',
        SECRET_KEY: process.env.PAYMENT_SECRET_KEY || 'your_payment_secret_key',
    },
    DRONE_TRACKING_INTERVAL: process.env.DRONE_TRACKING_INTERVAL || 5000,
    NODE_ENV: process.env.NODE_ENV || 'development',
};