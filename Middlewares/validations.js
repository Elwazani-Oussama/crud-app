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
    ],
    login : [
        check('email').notEmpty().withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email'),
        check('password')
        .notEmpty().withMessage('Password is required'),
    ],
    addStudent : [
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
        check('email').notEmpty().withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email'),
    check('phoneNumber')
        .notEmpty()
        .withMessage('Phone number is required')
        .isLength({ min: 10 })
        .withMessage('Phone number must be at least 10 characters long'),
        check('enrollNumber')
        .notEmpty()
        .withMessage('Enroll number is required')
        .isInt()
        .withMessage('Enroll number must be an integer'),
    ],
    updateStudent : [
        // firstName
        check('firstName')
        .notEmpty()
        .withMessage('First name is required')
        .isLength({ min: 3 })
        .withMessage('First name must be at least 3 characters long'),
        // lastName
        check('lastName')
        .notEmpty()
        .withMessage('Last name is required')
        .isLength({ min: 3 })
        .withMessage('Last name must be at least 3 characters long'),
        // email
        check('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email'),
        // phoneNumber
        check('phoneNumber')
        .notEmpty()
        .withMessage('Phone number is required')
        .isLength({ min: 10 })
        .withMessage('phone number must be at least 10 characters long'),
        // enrollNumber
        check('enrollNumber')
        .notEmpty()
        .withMessage('Enroll number is required')
        .isInt()
        .withMessage('Enroll number must be an integer'),
    ]
}

export const errorHandler = (req, res, next) => {
    const errors = validationResult(req); // Corrected to use validationResult
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
    }
    next(); // Proceed to the next middleware or route handler if no errors
};