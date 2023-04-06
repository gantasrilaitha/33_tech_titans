const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  role: String,
  fullName: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("users", UserSchema);