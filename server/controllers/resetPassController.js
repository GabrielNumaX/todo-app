require('dotenv').config();
const userModel = require('../models/userModel');
const tokenModel = require('../models/tokenModel');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
// const bcrypt = require("bcrypt");
// const SALT = 10;

const resetPassController = {};

resetPassController.requestLink = async (req, res) => {

    const {
        email
    } = req.body;

    const user = await userModel.findOne({email});

    if(!user) return res.status(404).send({message: 'Email not found'});

    let checkToken = await tokenModel.findOne({userId: user._id});

    if (checkToken) await token.deleteOne();

    let resetToken = crypto.randomBytes(32).toString("hex");

    // const hash = await bcrypt.hash(resetToken, SALT);
    // const hash = jwt.sign(resetToken)

    // esto lo guardo en la db
    const token = jwt.sign({ link: resetToken }, process.env.JWT, {expiresIn: '20m'});

    // con esto checkeo que NO este EXPIRADO y sea VALIDO cuando viene de vuelta del client
    // const decoded = jwt.verify(tokenFROMdb, process.env.JWT);

    // generar un token que expira con datos del user
    // hashear el token para guardar en la bdd
    // mandar el token NO hasheado en el link por email
    // abrir el link en el cliente y obtener los query params
    // mandar los querys por post
    // checkear resetToken user._id en



}