const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      // unique: true -> Ideally, should be unique, but its up to you
    },
    password: String,
  },
  {
    timestamps: true,
  }
);

const UserModel = model("user", UserSchema);

module.exports = UserModel;
