function hasUser() {
  return (res, req, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect("/auth/login");
    }
  };
}

function isGuest() {
  return (req, res, next) => {
    if (req.user) {
      res.redirect("/auth/login"); //TODO check assignment for correct redirect
    } else {
      next();
    }
  };
}

function isOwner() {
  return (req, res, next) => {
    if (res.locals.course.owner.toString() == req.user._id.toString()) {
      res.locals.isOwner = true;
      next();
    } else {
      res.redirect("/auth");
    }
  };
}

module.exports = {
  hasUser,
  isGuest,
  isOwner,
};
