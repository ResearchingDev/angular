const { body, validationResult } = require('express-validator');

const validateForm = [
    body('fname').isString().isLength({ min: 3 }).withMessage('First Name must be at least 3 characters long.'),
    body('lname').isString().isLength({ min: 3 }).withMessage('Last Name must be at least 3 characters long.'),
    body('username').isString().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long.'),
    body('address').isString().isLength({ min: 3 }).withMessage('Address must be at least 3 characters long.'),
    body('email').isEmail().withMessage('Email is invalid.'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateForm,
    handleValidationErrors,
};