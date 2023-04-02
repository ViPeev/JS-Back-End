const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, minlength:[2,"Username must be at least 2 characters long"] },
  email: { type: String, minlength:[10,"E-mail must be at least 10 characters long"] },
  password: { type: String, required:true },
});

const User = model("user", userSchema);

module.exports = User;
