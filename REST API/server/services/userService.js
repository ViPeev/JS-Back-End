const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = "123abc";
const tokenBlacklist = new Set();

async function register(email, password) {
  const existing = await User.findOne({ email }).collation({
    locale: "en",
    strenght: 2,
  });

  if (existing) {
    throw new Error("Email is taken");
  }

  const user = await User.create({
    email,
    hashedPassword: await bcrypt.hash(password, 10),
  });

  return createToken(user);
}

async function login(email, password) {
  const user = await User.findOne({ email }).collation({
    locale: "en",
    strenght: 2,
  });

  if (!user) {
    throw new Error("Incorrect email or password");
  }

  const match = await bcrypt.compare(password, user.hashedPassword);
  if (!match) {
    throw new Error("Incorrect email or password");
  }

  return createToken(user);
}

async function logout(token) {
    tokenBlacklist.add(token);
}

async function createToken(user) {
  let payload = {
    id: user._id,
    email: user.email,
  };

  return {
    _id: user._id,
    email: user.email,
    accessToken: jwt.sign(payload,secret),
  };
}

function parseToken(token) {
    if(tokenBlacklist.has(token)){
        throw new Error('Token is Blacklisted');
    }

    return jwt.verify(token,secret);
}

module.exports = {
  register,
  login,
  logout,
  parseToken,
};
