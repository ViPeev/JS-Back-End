const { createProduct } = require("../services/productService");
const parseError = require("../utils/parser");

const createController = require("express").Router();

createController.get("/", (req, res) => {
  res.render("create", {
    title: "Create",
  });
});

createController.post("/", async (req, res) => {
  const product = {
    name: req.body.name,
    location: req.body.location,
    age: Number(req.body.age),
    image: req.body.image,
    description: req.body.description,
    owner: req.user._id,
  };

  let errors = [];
  Object.entries(product).forEach(([k, v]) => {
    if (!v) {
      errors.push({ msg: `${k} is required` });
    }
  });
  try {
    if (errors.length > 0) {
      throw errors;
    }

    await createProduct(product);
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
