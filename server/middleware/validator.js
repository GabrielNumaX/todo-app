const { body, validationResult } = require("express-validator");
const userModel = require('../models/userModel');

const validate = {};

validate.signUpVal = () => {

    return [
        body('email').notEmpty().isEmail().withMessage('Invalid Email').custom(email => {

            return userModel.findOne({ email: email }).then(email => {
                if (email) {
                    return Promise.reject('Email already in use')
                }
            })
        }),
        body('username').notEmpty().custom(user => {

            return User.findOne({ username: user }).then(user => {
                if (user) {
                    return Promise.reject('Username already in use');
                }
            });
        }),
        body('password').notEmpty().isLength({ min: 8, max: 32 }).withMessage('Password not Valid'),
    ]
};

validate.valResult = (req, res, next) => {

    const error = validationResult(req).formatWith(({ msg }) => msg);

    const hasError = !error.isEmpty();

    if (hasError) {
        res.status(422).json({ error: error.array() });
    } else {
        next();
    }
}
