const { body, validationResult } = require("express-validator");
const userModel = require('../models/userModel');

const usernameVal = () => {

    return [
        body('username').notEmpty().isLength({ min: 2, max: 24 }).custom(user => {

            return userModel.findOne({ username: user }).then(user => {
                if (user) {
                    return Promise.reject('Username already in use');
                }
            });
        }),
    ]
};

const signUpVal = () => {

    return [
        body('email').notEmpty().isEmail().withMessage('Invalid Email').custom(email => {

            return userModel.findOne({ email: email }).then(email => {
                if (email) {
                    return Promise.reject('Email already in use')
                }
            })
        }),
        body('username').notEmpty().isLength({min: 2, max: 24}).withMessage('Invalid Username')
        
        // .custom(user => {

        //     return userModel.findOne({ username: user }).then(user => {
        //         if (user) {
        //             return Promise.reject('Username already in use');
        //         }
        //     });
        // })
        ,
        body('password').notEmpty().isLength({ min: 8, max: 32 }).withMessage('Password not Valid'),
    ]
};

// validate.loginVal = () => {

//     return [

//     ]
// }

const valResult = (req, res, next) => {

    // console.log('valResult');

    const error = validationResult(req).formatWith(({ msg }) => msg);

    const hasError = !error.isEmpty();

    if (hasError) {
        res.status(422).json({ error: error.array() });
    } else {
        next();
    }
}

module.exports = {usernameVal, signUpVal, valResult};