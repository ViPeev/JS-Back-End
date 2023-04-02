const { isGuest, isOwner, isNotOwner } = require("../middlewares/guards");
const {
  getProduct,
  deleteProduct,
  editProduct,
  addToList,
} = require("../services/productService");
const parseError = require("../utils/parser");

const detailsController = require("express").Router();

detailsController.get("/:id", async (req, res) => {
  const product = await getProduct(req.params.id);
  let isOwner = false;
  if (req.user) {
    isOwner = product.owner._id.toString() == req.user._id;
  }

  const comments = [];
  product.list.forEach((current) => {
    comments.push({
      username: current.userId.username,
      comment: current.comment,
    });
  });

  res.render("details", {
    title: `Details`,
    product,
    isOwner,
    comments,
  });
});

detailsController.get("/:id/delete", isGuest(), isOwner(), async (req, res) => {
  await deleteProduct(req.params.id);
  res.redirect("/catalog");
});

detailsController.post(
  "/:id/comment",
  isGuest(),
  isNotOwner(),
  async (req, res) => {
    await addToList(req.body.comment, req.params.id, req.user._id);
    res.redirect(`/details/${req.params.id}`);
  }
);

detailsController.get("/:id/edit", isGuest(), isOwner(), async (req, res) => {
  const product = await getProduct(req.params.id);
  res.render("edit", {
    title: "Edit",
    product,
  });
});

detailsController.post("/:id/edit", isGuest(), isOwner(), async (req, res) => {
  const edited = {
    name: req.body.name,
    location: req.body.location,
    age: Number(req.body.age),
    image: req.body.image,
    description: req.body.description,
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

    await editProduct(req.params.id, edited);
    res.redirect(`/details/${req.params.id}`);
  } catch (error) {
    res.render("edit", {
      title: "Edit",
      product: { ...req.body, _id: req.params.id },
      errors: parseError(error),
    });
  }
});
module.exports = detailsController;
