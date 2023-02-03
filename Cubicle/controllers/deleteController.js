const { deleteCube, getById } = require("../services/cubeService");

const deleteController = require("express").Router();

deleteController.get("/:id", async (req, res) => {
  const cube = await getById(req.params.id);
  res.render("delete", {
    title: "Delete",
    cube,
  });
});

deleteController.post("/:id", async (req, res) => {
  await deleteCube(req.params.id);
  res.redirect("/");
});

module.exports = deleteController;
