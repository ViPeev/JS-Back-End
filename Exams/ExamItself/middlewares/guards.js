const { getProduct } = require("../services/productService");

function hasUser() {
  return (req, res, next) => {
    if (req.user) {
      res.redirect("/");
    } else {
      next();
    }
  };
}

function isGuest() {
  return (req, res, next) => {
    if (!req.user) {
      res.redirect("/auth/login");
    } else {
      next();
    }
  };
}

function isOwner() {
  return async (req, res, next) => {
    const product = await getProduct(req.params.id);
    if (req.user._id == product.owner._id.toString()) {
      next();
    } else {
      res.redirect(`/details/${req.params.id}`);
    }
  };
}

function isNotOwner() {
  return async (req, res, next) => {
  const product = await getProduct(req.params.id);
    if ((req.user._id != product.owner._id.toString())) {
      next();
    } else {
      res.redirect(`/details/${req.params.id}`);
    }
  };
}
module.exports = {
  hasUser,
  isGuest,
  isOwner,
  isNotOwner,
};
