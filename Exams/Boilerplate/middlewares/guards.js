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

module.exports = {
  hasUser,
  isGuest,
};
