const { body, validationResult } = require('express-validator');

const validateUserRegistration = [
    body('username')
        .isLength({ min: 3 })
        .withMessage('Tên đăng nhập phải có ít nhất 3 ký tự.'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Mật khẩu phải có ít nhất 6 ký tự.'),
    body('email')
        .isEmail()
        .withMessage('Email không hợp lệ.'),
];

const validateProductCreation = [
    body('name')
        .notEmpty()
        .withMessage('Tên sản phẩm không được để trống.'),
    body('price')
        .isNumeric()
        .withMessage('Giá sản phẩm phải là một số.'),
    body('description')
        .notEmpty()
        .withMessage('Mô tả sản phẩm không được để trống.'),
];

const validateOrderPlacement = [
    body('address')
        .notEmpty()
        .withMessage('Địa chỉ giao hàng không được để trống.'),
    body('paymentMethod')
        .notEmpty()
        .withMessage('Phương thức thanh toán không được để trống.'),
];

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateUserRegistration,
    validateProductCreation,
    validateOrderPlacement,
    validateRequest,
};