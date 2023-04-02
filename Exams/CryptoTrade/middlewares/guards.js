const { getCrypto } = require("../services/cryptoService");

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
    let offer = await getCrypto(req.params.id);
    if (req.user._id == offer.owner.toString()) {
      next();
    } else {
      res.redirect(`/details/${req.params.id}`);
    }
  };
}

function isNotOwner() {
  return async (req, res, next) => {
    let offer = await getCrypto(req.params.id);
    if (req.user._id != offer.owner.toString()) {
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
