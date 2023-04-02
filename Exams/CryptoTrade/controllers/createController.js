const { createCrypto } = require("../services/cryptoService");
const parseError = require("../utils/parser");

const createController = require("express").Router();

createController.get("/", (req, res) => {
  res.render("create", {
    title: "Create",
  });
});

createController.post("/", async (req, res) => {
  const offer = {
    name: req.body.name,
    payment: req.body.payment,
    price: Number(req.body.price),
    image: req.body.image,
    description: req.body.description,
    owner: req.user._id,
  };

  let errors = [];
  Object.entries(offer).forEach(([k, v]) => {
    if (!v) {
      errors.push({ msg: `${k} is required` });
    }
  });
  try {
    if (errors.length > 0) {
      throw errors;
    }

    await createCrypto(offer);
    res.redirect("/catalog");
  } catch (error) {
    res.render("create", {
      title: "Create",
      errors: parseError(error),
      body: req.body,
    });
  }
});

module.exports = createController;
