const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

const loginController = {};

loginController.login = async (req, res) => {

    console.log('login');

    const {
        username,
        email,
        password,
    } = req.body;

    console.log(username, email, password);

    // return res.status(200);

    if(!username) {

        const loginUser = await userModel.findOne({email: email})

        if(!loginUser) return res.status(400).send({message: 'Invalid User or Password'});

        const checkPass = await bcrypt.compare(password, loginUser.password);

        if(!checkPass) return res.status(400).send({message: 'Invalid User or Password'});

        const token = loginUser.generateAuthToken();

        return res.status(200).send({token: token});
    }

    if(!email) {

        const loginUser = await userModel.findOne({username: username});

        if(!loginUser) return res.status(400).send({message: 'Invalid User or Password'});

        const checkPass = await bcrypt.compare(password, loginUser.password);

        if(!checkPass) return res.status(400).send({message: 'Invalid User or Password'});

        const token = loginUser.generateAuthToken();

        return res.status(200).send({token: token});
    }
}

module.exports = loginController;