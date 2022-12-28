const router = require("express").Router();
const { getAll } = require("../models/cubeServices");

router.get("/", (req, res) => {
  res.render("home", {
    cubes: getAll(),
    title: "Cubicle",
  });
});

router.post("/", (req, res) => {
  const search = req.body.search;
  const from = req.body.from;
  const to = req.body.to;
  let cubes = getAll().filter((item) => {
    return item.name.toLowerCase().includes(search.toLowerCase());
  });

  if(from){
    cubes = cubes.filter((item) => {
      return Number(item.difficultyLevel) >= Number(from);
    });
  }
  if(to){
    cubes = cubes.filter((item) => {
      return Number(item.difficultyLevel) <= Number(to);
    });
  }

  console.log(cubes);
  res.render("home", {
    cubes,
    title: "Cubicle",
  });
});

module.exports = router;
