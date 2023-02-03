const { getById } = require("../services/cubeService");

const detailsController = require("express").Router();

detailsController.get("/:id", async (req, res) => {
  const cube = await getById(req.params.id);
  if (req.user && cube.createrId == req.user._id) {
    cube.isOwner = true;
  }
  res.render("details", {
    title: "Details",
    cube,
  });
});

module.exports = detailsController;
