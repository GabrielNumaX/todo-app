require('dotenv').config();
const userModel = require('../models/userModel');
const tokenModel = require('../models/tokenModel');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const {
    isValidObjectId
} = require('../middleware/validator');

const sendEmail = require('../utils/sendEmail');

const resetPassController = {};

resetPassController.requestLink = async (req, res) => {

    const {
        email
    } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) return res.status(404).send({ message: 'Email not found' });

    let checkToken = await tokenModel.findOne({ userId: user._id });

    if (checkToken) await checkToken.deleteOne();

    let resetToken = crypto.randomBytes(32).toString("hex");

    const token = await bcrypt.hash(resetToken, SALT_WORK_FACTOR);

    const savedToken = new tokenModel({
        userId: user._id,
        token: token,
    });
    
    await savedToken.save();

    // this should be app URL for reset PAGE
    // const resetLink = `http://localhost:3000/reset-password/?token=${token}`;

    const resetLink = `http://localhost:3000/reset-password/?token=${resetToken}&id=${user._id}`;

    console.log('resetLink', resetLink);
    
    // aca mandar EMAIL
    sendEmail(
        user.email,
        "Calendarium Password Reset Request",
        {
            name: user.username,
            link: resetLink,
        },
        '../utils/emailTemplates/requestPasswordReset.handlebars'
    );

    // return link;

    return res.status(200).send({message: `Reset Link Email sent to ${user.email}`})
}

resetPassController.resetPass = async (req, res) => {

    const {
        token,
        password, 
        userId,
    } = req.body;

    if(!isValidObjectId(userId)) return res.status(400).send({message: 'Invalid or Expired Link'});

    let passwordResetToken = await tokenModel.findOne({ userId });

    if (!passwordResetToken) return res.status(400).send({message: "Invalid or Expired Link"});

    const isValid = await bcrypt.compare(token, passwordResetToken.token);

    if (!isValid) return res.status(400).send({message: "Invalid or Expired Link"});

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hashPass = await bcrypt.hash(password, salt);

    const updatedUserPass = await userModel.findByIdAndUpdate(userId, {
        password: hashPass,
    }, {new: true} );

    await passwordResetToken.deleteOne();

    sendEmail(
        updatedUserPass.email,
        "Calendarium Password Reset Confirmation",
        {
            name: updatedUserPass.username,
            link: "http://localhost:3000"
        },
        '../utils/emailTemplates/passwordResetConfirmation.handlebars'
    );

    return res.status(200).send({message: `Confirmation Email sent to ${updatedUserPass.email}`})

}


module.exports = resetPassController;