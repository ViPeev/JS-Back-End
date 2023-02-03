// TODO: Require Controllers...

const aboutController = require("../controllers/aboutController");
const attachController = require("../controllers/attachController");
const authController = require("../controllers/authController");
const createController = require("../controllers/createController");
const deleteController = require("../controllers/deleteController");
const detailsController = require("../controllers/detailsController");
const editController = require("../controllers/editController");
const homeController = require("../controllers/homeController");
const { isUser } = require("../middleware/guards");

module.exports = (app) => {
  app.use("/", homeController);
  app.use("/about", aboutController);
  app.use("/create",isUser(), createController);
  app.use("/details", detailsController);
  app.use("/attach",isUser(), attachController);
  app.use("/edit", isUser(),editController);
  app.use("/delete",isUser(),deleteController);
  app.use("/auth",authController);
  app.use("*", (req, res) =>
    res.render("404", {
      title: "Cubicle",
    })
  );
};
