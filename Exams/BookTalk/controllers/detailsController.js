const { isGuest, isOwner, isNotOwner } = require("../middlewares/guards");
const {
  getBook,
  deleteBook,
  editBook,
  addToWishList,
} = require("../services/bookService");
const parseError = require("../utils/parser");

const detailsController = require("express").Router();

detailsController.get("/:id", async (req, res) => {
  const review = await getBook(req.params.id);
  let isOwner = false;
  let isWished = false;
  
  if (req.user) {
    isOwner = review.owner.toString() == req.user._id;
    isWished = review.wishingList
      .map((v) => v._id.toString())
      .includes(req.user._id);
  }

  res.render("details", {
    title: `${review.title}`,
    review,
    isOwner,
    isWished
  });
});

detailsController.get("/:id/delete",isGuest(),isOwner(), async (req, res) => {
  await deleteBook(req.params.id);
  res.redirect("/catalog");
});

detailsController.get("/:id/wish",isGuest(),isNotOwner(), async (req, res) => {
  await addToWishList(req.params.id, req.user._id);
  res.redirect(`/details/${req.params.id}`);
});

detailsController.get("/:id/edit",isGuest(),isOwner(), async (req, res) => {
  const review = await getBook(req.params.id);
  res.render("edit", {
    title: "Edit",
    review,
  });
});

detailsController.post("/:id/edit",isGuest(),isOwner(), async (req, res) => {
  const edited = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    stars: Number(req.body.stars),
    image: req.body.image,
    review: req.body.review,
  };

  let errors = [];
  Object.entries(edited).forEach(([k, v]) => {
    if (!v) {
      errors.push({ msg: `${k} is required` });
    }
  });
  try {
    if (errors.length > 0) {
      throw errors;
    }

    await editBook(req.params.id, edited);
    res.redirect(`/details/${req.params.id}`);
  } catch (error) {
    res.render("edit", {
      title: "Edit",
      review: req.body,
      errors: parseError(error),
    });
  }
});
module.exports = detailsController;
