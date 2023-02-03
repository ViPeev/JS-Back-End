const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: { type: String, required: true, unique: true},
  username: {
    type: String,
    require: true,
    unique: true,
    match:[/^[a-zA-Z0-9]+$/i,'Username may contain only English letters and numbers']
  },
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
