const { getAll } = require("../services/bookService");

const catalogController = require("express").Router();

catalogController.get("/", async (req, res) => {
  const reviews = await getAll();
  res.render("catalog", {
    title: "Catalog",
    reviews
  });
});

module.exports = catalogController;
