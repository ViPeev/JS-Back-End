const { isGuest, isUser } = require("../middleware/guards");
const { register, login } = require("../services/userService");
const { parseError } = require("../utils");

const authController = require("express").Router();

authController.get("/register", isGuest(), (req, res) => {
  res.render("register", {
    title: "Register",
  });
});

authController.post("/register", isGuest(), async (req, res) => {
  const { username, password, repass } = req.body;
  try {
    if (!username || !password) {
      throw new Error("All fields are required");
    }
    if (password != repass) {
      throw new Error("Passwords do not match");
    }
    const token = await register({ username, password });
    res.cookie("token", token);
    res.redirect("/");
  } catch (error) {
    res.render("register", {
      title: "Register",
      body: { username },
      errors: parseError(error),
    });
  }
});

authController.get("/login", isGuest(), (req, res) => {
  res.render("login", {
    title: "Login",
  });
});

authController.post("/login", isGuest(), async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      throw new Error("All fields are required");
    }

    const token = await login({ username, password });
    res.cookie("token", token);
    res.redirect("/");
  } catch (error) {
    res.render("login", {
      title: "Login",
      body: { username },
      errors: parseError(error),
    });
  }
});

authController.get("/logout", isUser(), (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

module.exports = authController;
