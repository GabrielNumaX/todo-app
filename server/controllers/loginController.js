const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

const loginController = {};

loginController.login = async (req, res) => {
    
    const {
        email,
        password,
    } = req.body;


        const emailCheck = await userModel.findOne({email: email})

        if(emailCheck) {

            const checkPass = await bcrypt.compare(password, emailCheck.password);

            if(!checkPass) return res.status(400).send({message: 'Invalid User or Password'});

            const token = emailCheck.generateAuthToken();

            return res.status(200).send({token: token, username: emailCheck.username});

        }

        const userCheck = await userModel.findOne({username: email});

        if(userCheck) {

            const checkPass = await bcrypt.compare(password, userCheck.password);

            if(!checkPass) return res.status(400).send({message: 'Invalid User or Password'});

            const token = userCheck.generateAuthToken();

            return res.status(200).send({token: token, username: userCheck.username});

        }

        return res.status(400).send({message: 'Invalid User or Password'});
    
}

module.exports = loginController;