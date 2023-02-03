const { hasUser, isGuest } = require("../middlewares/guards");
const { login, register } = require("../services/userServices");
const parseError = require("../utils/parser");

const authController = require("express").Router();
authController.get("/login", hasUser(),(req, res) => {
  res.render("login", {
    title: "Login",
  });
});

authController.post("/login", hasUser(),async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    if (!email || !password) {
      throw new Error("All fields are required");
    }
    const token = await login({ email, password });
    res.cookie("jwt", token);
    res.redirect("/");
  } catch (error) {
    res.render("login", {
      title: "Login",
      body: { email, password },
      errors: parseError(error),
    });
  }
});

authController.get("/register",hasUser(), (req, res) => {
  res.render("register", {
    title: "Register",
  });
});

authController.post("/register",hasUser(), async (req, res) => {
  const { email, username, password, repass } = req.body;
  try {
    if (!email || !password || !username) {
      throw new Error("All fields are required");
    }
    if (password.length < 3) {
      throw new Error("Password must be at least 3 characters long");
    }
    if (password !== repass) {
      throw new Error("Passwords don't match");
    }
    const token = await register({ email, username, password });
    res.cookie("jwt", token);
    res.redirect("/");
  } catch (error) {
    res.render("register", {
      title: "Register",
      body: { email, username },
      errors: parseError(error),
    });
  }
});

authController.get("/logout",isGuest(), (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/");
});

module.exports = authController;
