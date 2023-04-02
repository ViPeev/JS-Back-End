const { isGuest, isOwner, isNotOwner } = require("../middlewares/guards");
const {
  getCrypto,
  deleteCrypto,
  editCrypto,
  addToWishList,
} = require("../services/cryptoService");
const parseError = require("../utils/parser");

const detailsController = require("express").Router();

detailsController.get("/:id", async (req, res) => {
  const offer = await getCrypto(req.params.id);
  let isOwner = false;
  let isWished = false;
  
  if (req.user) {
    isOwner = offer.owner.toString() == req.user._id;
    isWished = offer.wishingList
      .map((v) => v._id.toString())
      .includes(req.user._id);
  }

  res.render("details", {
    title: `${offer.name}`,
    offer,
    isOwner,
    isWished
  });
});

detailsController.get("/:id/delete",isGuest(),isOwner(), async (req, res) => {
  await deleteCrypto(req.params.id);
  res.redirect("/catalog");
});

detailsController.get("/:id/wish",isGuest(),isNotOwner(), async (req, res) => {
  await addToWishList(req.params.id, req.user._id);
  res.redirect(`/details/${req.params.id}`);
});

detailsController.get("/:id/edit",isGuest(),isOwner(), async (req, res) => {
  const offer = await getCrypto(req.params.id);
  res.render("edit", {
    title: "Edit",
    offer,
  });
});

detailsController.post("/:id/edit",isGuest(),isOwner(), async (req, res) => {
  const edited = {
    name: req.body.name,
    price: req.body.price,
    payment: req.body.payment,
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

    await editCrypto(req.params.id, edited);
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
