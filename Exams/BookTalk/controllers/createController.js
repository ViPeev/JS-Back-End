const { createBook } = require("../services/bookService");
const parseError = require("../utils/parser");

const createController = require("express").Router();

createController.get("/", (req, res) => {
  res.render("create", {
    title: "Create",
  });
});

createController.post("/", async (req, res) => {
  const book = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    stars: Number(req.body.stars),
    image: req.body.image,
    review: req.body.review,
    owner: req.user._id,
  };

  let errors = [];
  Object.entries(book).forEach(([k, v]) => {
    if (!v) {
      errors.push({ msg: `${k} is required` });
    }
  });
  try {
    if (errors.length > 0) {
      console.log(errors);
      throw errors;
    }

    await createBook(book);
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
