const { getAll } = require("../services/cryptoService");

const catalogController = require("express").Router();

catalogController.get("/", async (req, res) => {
  const offers = await getAll();
  res.render("catalog", {
    title: "Catalog",
    offers
  });
});

module.exports = catalogController;
