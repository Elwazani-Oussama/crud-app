import { check, validationResult } from 'express-validator';

export const Validations = {
    signup : [
        check('firstName')
        .notEmpty()
        .withMessage('First name is required')
        .isLength({ min: 3 })
        .withMessage('First name must be at least 3 characters long'),
        check('lastName')
        .notEmpty()
        .withMessage('Last name is required')
        .isLength({ min: 3 })
        .withMessage('Last name must be at least 3 characters long'),
        check('password').notEmpty().withMessage('Password is required'),
        check('email').notEmpty().withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email'),
    ]
}

export const errorHandler = (req, res, next) => {
    const errors = validationResult(req); // Corrected to use validationResult
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
    }
    next(); // Proceed to the next middleware or route handler if no errors
};