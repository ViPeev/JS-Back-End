const {
  createCourse,
  getById,
  deleteById,
  updateById,
  enrollUser,
} = require("../services/courseService");
const preload = require("../middlewares/preload");
const { parseError } = require("../util/parser");

const courseController = require("express").Router();

courseController.get("/create", (req, res) => {
  res.render("create", {
    title: "Create course",
  });
});

courseController.get("/:id", preload(), async (req, res) => {
  const course = res.locals.course;
  course.isOwner = course.owner.toString() == req.user._id.toString();
  course.enrolled = course.users
    .map((x) => x.tostring())
    .includes(req.user._id.toString());

  res.render("details", {
    title: course.title,
    course,
  });
});

courseController.get("/:id/delete", preload(), async (req, res) => {
  const course = res.locals.course;

  if (course.owner.toString() != req.user._id.toString()) {
    return res.redirect("/auth/login");
  }

  await deleteById(req.params.id);
  res.redirect("/");
});

courseController.post("/create", async (req, res) => {
  const course = {
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    duration: req.body.duration,
    owner: req.user._id,
  };
  try {
    await createCourse(course);
    res.redirect("/");
  } catch (error) {
    res.render("create", {
      title: "Create course",
      errors: parseError(error),
      body: course,
    });
  }
});

courseController.get("/:id/edit", preload(), async (req, res) => {
  const course = res.locals.course;

  if (course.owner.toString() !== req.user._id.toString()) {
    return res.redirect("/auth/login");
  }

  res.render("edit", {
    title: "Edit Course",
    course,
  });
});

courseController.post("/:id/edit", preload(), async (req, res) => {
  const course = res.locals.course;

  if (course.owner.toString() !== req.user._id.toString()) {
    return res.redirect("/auth/login");
  }

  try {
    await updateById(req.params.id, req.body);
    res.redirect(`/course/${req.params.id}`);
  } catch (err) {
    res.render("edit", {
      title: "Edit Course",
      course: req.body,
      errors: parseError(err),
    });
  }
});

courseController.get("/:id/enroll", preload(), async (req, res) => {
  const course = res.locals.course;

  if (
    course.owner.toString() != req.user._id.toString() &&
    course.users.map((x) => x.toString()).includes(req.user._id.toString()) ==
      false
  ) {
    await enrollUser(req.params.id, req.user._id);
  }

  return res.redirect(`/course/${req.params.id}`);
});

module.exports = courseController;
