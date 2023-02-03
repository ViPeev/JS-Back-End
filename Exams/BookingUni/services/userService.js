const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = "123abc456def";

async function register(email, username, password) {
  const existingUsername = await User.findOne({ username }).collation({
    locale: "en",
    strength: 2,
  });

  if (existingUsername) {
    throw new Error("Username is taken");
  }

  const existingEmail = await User.findOne({ email }).collation({
    locale: "en",
    strength: 2,
  });

  if (existingEmail) {
    throw new Error("Email is taken");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ email, username, hashedPassword });
  //TODO see assignment if registration creates user session
  return createSession(user);
}

async function login(email, password) {
  const user = await User.findOne({ email }).collation({
    locale: "en",
    strength: 2,
  });
  if (!user) {
    throw new Error("Incorrect email or password");
  }

  const hasMatch = await bcrypt.compare(password, user.hashedPassword);
  console.log(hasMatch)
  if (!hasMatch) {
    throw new Error("Incorrect email or password");
  }

  return createSession(user);
}

function createSession({ email, username, _id }) {
  const payload = { username, _id, email };
  return jwt.sign(payload, secret);
}

function verifyToken(token) {
  return jwt.verify(token, secret);
}

module.exports = {
  register,
  login,
  verifyToken,
};
