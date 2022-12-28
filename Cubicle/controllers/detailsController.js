const router = require("express").Router();
const { getById } = require("../models/cubeServices");

router.get("/:id", (req, res) => {
  let cube = getById(req.params.id);
  if (cube) {
    res.render("details", {
      title: "Details",
      cube,
    });
  }
});

router.post("/", (req, res) => {
  addItem(req.body);
  res.render("home");
});

module.exports = router;
