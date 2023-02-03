const { getBook } = require("../services/bookService");

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
      res.redirect("/auth/login"); //TODO check assignment for correct redirect
    } else {
      next();
    }
  };
}

function isOwner() {
  return async (req, res, next) => {
    let review = await getBook(req.params.id);
    if (req.user._id == review.owner.toString()) {
      next();
    } else {
      res.redirect(`/details/${req.params.id}`);
    }
  };
}

function isNotOwner() {
  return async (req, res, next) => {
    let review = await getBook(req.params.id);
    if (req.user._id =! review.owner.toString()) {
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
  isNotOwner
};
