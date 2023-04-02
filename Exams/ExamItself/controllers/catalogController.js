const { getAll } = require("../services/productService");

const catalogController = require("express").Router();

catalogController.get("/", async (req, res) => {
  const products = await getAll();
  res.render("catalog", {
    title: "Posts",
    products
  });
});

module.exports = catalogController;
