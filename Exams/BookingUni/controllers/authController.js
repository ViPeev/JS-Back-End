const { register, login } = require("../services/userService");
const { parseError } = require("../util/parser");
const validator = require("validator");

const authController = require("express").Router();

authController.get("/register", (req, res) => {
  //TODO replace with actual view by assignment
  res.render("register", {
    title: "Register page",
  });
});

authController.post("/register", async (req, res) => {
  try {
    if (validator.isEmail(req.body.email) == false) {
      throw new Error("Invalid email");
    }
    if (req.body.username == "" || req.body.password == "") {
      throw new Error("All fields are required!");
    }
    if (req.body.password.length < 5) {
      throw new Error("Password must be at least five characters long");
    }
    if (req.body.repass !== req.body.password) {
      throw new Error("Password don't match!");
    }
    const token = await register(req.body.email,req.body.username, req.body.password);
    res.cookie("token", token);
    res.redirect("/");
  } catch (error) {
    const errors = parseError(error);
    //TODO add error display to actual template from assignment
    res.render("register", {
      title: "Register page",
      errors,
      body: {
        username: req.body.username,
        email:req.body.email
      },
    });
  }
});

authController.get("/login", (req, res) => {
  //TODO replace with actual view by assignment
  res.render("login", {
    title: "Login page",
  });
});

authController.post("/login", async (req, res) => {
  try {
    if (req.body.username == "" || req.body.password == "") {
      throw new Error("All fields are required!");
    }
    const token = await login(req.body.username, req.body.password);
    res.cookie("token", token);
    res.redirect("/"); //TODO Replace with redirect by assignment
  } catch (error) {
    const errors = parseError(error);
    res.render("login", {
      title: "Login Page",
      errors,
      body: {
        username: req.body.username,
      },
    });
  }
});

authController.get("/logout", (req, res) => {
  console.log(req.cookies)
  res.clearCookie("token");
  res.redirect("/");
});

module.exports = authController;
