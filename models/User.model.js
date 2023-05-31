const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    image: String,
    weekDays: String,
    babyName: String,
  }
);

const User = model("User", userSchema);

module.exports = User;
