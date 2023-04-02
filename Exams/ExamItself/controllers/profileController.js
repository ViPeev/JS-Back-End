const { getAllFiltered } = require("../services/productService");

const profileController = require("express").Router();

profileController.get("/", async (req, res) => {
  const products = await getAllFiltered(req.user._id);
  
  res.render("profile", {
    title: "Profile",
    products
  });
});

module.exports = profileController;
