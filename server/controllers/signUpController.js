const userModel = require('../models/userModel');
const { body } = require('express-validator');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const signUpController = {};

signUpController.usernameCheck = async (req, res) => {

    const {
        username
    } = req.body;

    const usernameCheck = userModel.findOne({username: username});

    if(!usernameCheck) return res.status(200).send({message: 'Username available'});

    
}

signUpController.signUp = async (req, res) => {

    const {
        username,
        password,
        email,
    } = req.body;

    console.log('username');

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);

    const hashPass = await bcrypt.hash(password, salt);

    // console.log('signUp');

    // console.log('salt', salt);
    // console.log('hash', hashPass);

    const newUser = new userModel({
        username,
        password: hashPass,
        email
    })

    await newUser.save();

    return res.status(200).send({message: 'User Created'});

}

module.exports = signUpController;