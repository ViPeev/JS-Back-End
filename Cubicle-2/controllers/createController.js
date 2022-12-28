const router = require("express").Router();
const { addItem } = require("../models/cubeServices");

router.get("/", (req, res) => {
  res.render("create"),{
    title:"Create"
  };
});

router.post("/", (req, res) => {
  addItem(req.body)
  res.render("home");
});

module.exports = router;
