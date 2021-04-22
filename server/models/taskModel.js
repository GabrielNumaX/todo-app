const Mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
const Joi = require('joi');
const Joigoose = require('joigoose')(Mongoose, { convert: true });


const joiTasksSchema = Joi.object({

    task: Joi.string().min(3).max(256).trim().required(),
    date: Joi.number().sign('positive').integer().trim().require(),
    createdAt: Joi.date().default(new Date()),

    user: Joi.string().meta({
        _mongoose: {
            type: "ObjectId",
            ref: "Users",
        }
    })

    .meta({ _mongoose: { timestamps: true } }),
  });

const mongooseTasksSchema = new Schema(
    Joigoose.convert(joiTasksSchema)
);

module.exports = model("Tasks", mongooseTasksSchema);