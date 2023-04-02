const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = "secretPass";

async function register({ username, password, email }) {
  const usernameTaken = await User.findOne({ username });
  if (usernameTaken) {
    throw new Error("Username is taken");
  }

  const emailTaken = await User.findOne({ email });
  if (emailTaken) {
    throw new Error("Email is taken");
  }

  password = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password, email });
  return createToken(user);
}

async function login({ username, password }) {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("Incorrect credentials");
  }

  const hasMatch = await bcrypt.compare(password, user.password);
  if (!hasMatch) {
    throw new Error("Incorrect credentials");
  }
  return createToken(user);
}

function createToken({ username, email, _id }) {
  const payload = {
    username,
    email,
    _id,
  };
  return jwt.sign(payload, secret);
}

function verifyToken(token) {
  return jwt.verify(token, secret);
}

module.exports = {
  register,
  login,
  createToken,
  verifyToken,
};
