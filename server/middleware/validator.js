const { body, validationResult } = require("express-validator");
const userModel = require('../models/userModel');

const ObjectId = require('mongoose').Types.ObjectId;

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
        body('username').notEmpty().isLength({ min: 2, max: 24 }).withMessage('Invalid Username')

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

// task: Joi.string().min(3).max(64).trim().required(),
// date: Joi.number().sign('positive').integer().required(),
const taskVal = () => {

    return [
        body('task').notEmpty().withMessage('Invalid Task')
    ]

}

const taskEditVal = () => {

    return [
        body('taskId').notEmpty().withMessage('Invalid Task'),
        body('isChecked').notEmpty().isBoolean().withMessage('Invalid Data'),
    ]

}

const requestLinkVal = () => {

    return [
        body('email').notEmpty().isEmail().withMessage('Invalid Email')
    ]
}

const resetPassVal = () => {

    return [
        body('password').notEmpty().isLength({ min: 8, max: 32 }).withMessage('Password not Valid'),
        body('userId').notEmpty().withMessage('Invalid Data'),
        body('token').notEmpty().withMessage('Invalid Data'),
    ]
}
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


const isValidObjectId = (id) => {

    if (ObjectId.isValid(id)) {
        if ((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}

module.exports = {
    usernameVal,
    signUpVal,
    taskVal,
    valResult,
    taskEditVal,
    isValidObjectId,
    requestLinkVal,
    resetPassVal,
};