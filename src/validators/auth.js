import { check, validationResult } from 'express-validator';

export const validateSignupRequest = [
    check('firstName')
    .notEmpty().withMessage('firstName is required'),
    check('lastName')
    .notEmpty().withMessage('lastNane is required'),
    check('email')
    .notEmpty().withMessage('email is required'),
    check('password')
    .isLength({ min: 5 }).withMessage('must be at least 5 chars long')
];

export const validateSigninRequest = [
    check('email')
    .notEmpty().withMessage('email is required'),
    check('password')
    .isLength({ min: 5 }).withMessage('must be at least 5 chars long')
];

export const isRequestValidated = (req,res,next) =>{
    const errors = validationResult(req);
    if(errors.array().length > 0){
        return res.status(400).json({error: errors.array()[0].msg})
    }
    next();
}