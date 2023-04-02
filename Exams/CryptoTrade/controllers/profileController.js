const { getAllFiltered } = require("../services/cryptoService");

const profileController = require("express").Router();

profileController.get("/", async (req, res) => {
  const reviews = await getAllFiltered(req.user._id);
  console.log(reviews);
  res.render("profile", {
    title: "Profile",
    reviews
  });
});

module.exports = profileController;
