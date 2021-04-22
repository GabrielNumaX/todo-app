require('dotenv').config();
const jwt = require('jsonwebtoken');
const Mongoose = require("mongoose");
const { Schema, model } = require('mongoose');
const Joi = require('joi');
const Joigoose = require("joigoose")(Mongoose, {convert: true});
// const bcrypt = require('bcrypt');
// const SALT_WORK_FACTOR = 10;

const joiUsersSchema = Joi.object({

    email: Joi.string().email({minDomainSegments: 2, tlds: false }).max(256).required(),
    username: Joi.string().min(2).max(32).required().trim(),
    password: Joi.string().required().trim().min(8).max(512),
    createdAt: Joi.date().default(new Date())

    .meta({ _mongoose: { timestamps: true } }),
  });

const mongooseUsersSchema = new Schema(
    Joigoose.convert(joiUsersSchema)
);

mongooseUsersSchema.methods.generateAuthToken = function() {

  const token = jwt.sign({ id: this._id }, process.env.JWT);

  return token;
}

// mongooseUsersSchema.methods.hashPass = async function() {

//     const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);

//     const hashPass = await bcrypt.hash(this.password, salt);

//     return hashPass;
// }

module.exports = model("Users", mongooseUsersSchema);