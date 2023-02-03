const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, require: true, unique: true, minlength:[3,'Username must be at least 3 characters long'] },
  hashedPassword: { type: String, required: true },
});

userSchema.index(
  { username: 1 },
  {
    collation: {
      locale: "en",
      strenght: 2,
    },
  }
);

const user = model("User", userSchema);

module.exports = user;
