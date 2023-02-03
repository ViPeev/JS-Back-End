const aboutController = require("express").Router();

aboutController.get("/", (req, res) => {
  res.render("about", {
    title: "Cubicle",
  });
});