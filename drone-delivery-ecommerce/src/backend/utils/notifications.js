const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendEmailNotification = (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

const sendOrderConfirmation = (userEmail, orderDetails) => {
    const subject = 'Order Confirmation';
    const text = `Thank you for your order! Here are your order details:\n\n${orderDetails}`;
    sendEmailNotification(userEmail, subject, text);
};

const sendDeliveryUpdate = (userEmail, deliveryDetails) => {
    const subject = 'Delivery Update';
    const text = `Your delivery is on the way! Here are the details:\n\n${deliveryDetails}`;
    sendEmailNotification(userEmail, subject, text);
};

module.exports = {
    sendEmailNotification,
    sendOrderConfirmation,
    sendDeliveryUpdate
};