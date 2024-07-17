import { body } from 'express-validator';

export const registerUserValidation = [
    body('email', 'invalid, email cannot be empty').not().notEmpty(),
    body('email', 'Invalid email').isEmail(),
    body('firstName', 'Invalid first name').not().notEmpty().isLength({min: 3}), 
    body('lastName', 'Invalid last name').not().notEmpty().isLength({min: 3}), 
    body('password', 'Invalid creds').not().notEmpty().isLength({min: 5}), 
]

export const loginUserValidation = [
    body('email', 'invalid, email cannot be empty').not().notEmpty().isEmail(),
    body('password', 'invalid creds').not().notEmpty().isLength({min: 5}),
]