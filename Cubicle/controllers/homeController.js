const { getAll } = require("../services/cubeService");

const homeController = require("express").Router();

homeController.get("/", async (req, res) => {
  const cubes = await getAll(req.body);
  res.render("home", {
    title: "Cubicle",
    cubes,
  });
});

homeController.post("/", async (req, res) => {
  const cubes = await getAll(req.body);
  res.render("home", {
    title: "Cubicle",
    cubes,
  });
});

module.exports = homeController;
