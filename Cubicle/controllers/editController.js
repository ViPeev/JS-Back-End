const { getById, updateById } = require("../services/cubeService");
const { parseError } = require("../utils");

const editController = require("express").Router();

editController.get("/:id", async (req, res) => {
  const cube = await getById(req.params.id);
  res.render("edit", {
    title: "Edit",
    cube,
  });
});

editController.post("/:id", async (req, res) => {
  const cube = {
    name: req.body.name,
    description: req.body.description,
    diffLevel: Number(req.body.diffLevel),
    imageUrl: req.body.imageUrl,
  };

  try {
    if (Object.values(cube).some((v) => !v)) {
      throw new Error("All fields are required");
    }
    await updateById(req.params.id, cube);
    res.redirect(`/details/${req.params.id}`);
  } catch (error) {
    res.render('edit',{
      title:"Edit",
      cube,
      errors:parseError(error)
    })
  }
});

module.exports = editController;
