const { createAccessory } = require("../services/accessoryService");
const { createCube } = require("../services/cubeService");
const { parseError } = require("../utils");

const createController = require("express").Router();

createController.get("/cube", (req, res) => {
  res.render("createCube", {
    title: "Create",
  });
});

createController.post("/cube", async (req, res) => {
  const cube = {
    name: req.body.name,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    diffLevel: Number(req.body.diffLevel),
    createrId:req.user._id
  };
  try {
    await createCube(cube);
    res.redirect("/");
  } catch (error) {
    res.render("createCube", {
      title: "Create",
      body: cube,
      errors: parseError(error),
    });
  }
});

createController.get("/accessory", (req, res) => {
  res.render("createAccessory", {
    title: "Create",
  });
});

createController.post("/accessory", async (req, res) => {
  const accessory = {
    name: req.body.name,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
  };
  try {
    await createAccessory(accessory);
    res.redirect("/");
  } catch (error) {
    res.render("createAccessory", {
      title: "Create",
      body: accessory,
      errors: parseError(error),
    });
  }
});

module.exports = createController;
