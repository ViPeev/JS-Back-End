const authController = require("../controllers/authController");
const catalogController = require("../controllers/catalogController");
const createController = require("../controllers/createController");
const detailsController = require("../controllers/detailsController");
const homeController = require("../controllers/homeController");
const profileController = require("../controllers/profileController");
const { isGuest } = require("../middlewares/guards");

module.exports = (app) => {
  app.use("/", homeController);
  app.use("/auth", authController);
  app.use("/create", isGuest(),createController);
  app.use("/catalog", catalogController);
  app.use("/details", detailsController);
  app.use("/profile",isGuest(), profileController);
  app.use("*", (req, res) => {
    res.render("404");
  });
};
