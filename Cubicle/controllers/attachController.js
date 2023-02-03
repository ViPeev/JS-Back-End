const { getById, addAccessory } = require("../services/cubeService");
const { getAll } = require("../services/accessoryService");

const attachController = require("express").Router();

attachController.get("/accessory/:id", async (req, res) => {
  let [cube, accessories] = await Promise.all([
    getById(req.params.id),
    getAll(),
  ]);

  let filter = cube.accessories.map((v) => v._id.toString());
  accessories = accessories.filter((a) => !filter.includes(a._id.toString()));
  res.render("attachAccessory", {
    title: "Attach Accessory",
    cube,
    accessories,
  });
});

attachController.post("/accessory/:id", async (req, res) => {
  await addAccessory(req.params.id, req.body.accessory);
  res.redirect(`/details/${req.params.id}`);
});

module.exports = attachController;
