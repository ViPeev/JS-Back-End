const { verifyToken } = require("../services/userService");

module.exports = () => (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const userData = verifyToken(token);
      req.user = userData;
      res.locals.username = userData.username;
    } catch (err) {
      console.log("Invalid token");
      res.clearCookie("token");
      return res.redirect("/auth/login");
    }
  }
  next();
};
