const Mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: { 
    type: Date, 
    // seconds = 15 min
    expires: 900, 
    default: Date.now 
  }
});

module.exports = model("Tokens", tokenSchema);