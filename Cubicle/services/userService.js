const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = "123abc";

async function register({ username, password }) {
  const existing = await userModel.findOne({ username });
  if (existing) {
    throw new Error("Username is taken");
  }

  password = await bcrypt.hash(password, 10);
  const user = await userModel.create({ username, password });
  return createSession(user);
}

async function login({ username, password }) {
  const existing = await userModel.findOne({ username });
  if (!existing) {
    throw new Error("Incorrect username or password");
  }

  const hasMatch = await bcrypt.compare(password, existing.password);
  if (!hasMatch) {
    throw new Error("Incorrect username or password");
  }

  return createSession(existing);
}

async function createSession({ username, _id }) {
  const payload = {
    username,
    _id,
  };

  return jwt.sign(payload, secret);
}

function verifyToken(token) {
  return jwt.verify(token, secret);
}

module.exports = { register, login, verifyToken };
