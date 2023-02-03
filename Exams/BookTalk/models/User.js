const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, minlength:[4,"Username must be at least 4 characters long"] },
  email: { type: String, minlength:[10,"E-mail must be at least 10 characters long"] },
  password: { type: String, required:true },
});

const User = model("user", userSchema);

module.exports = User;
