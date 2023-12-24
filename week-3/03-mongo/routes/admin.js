const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  await Admin.create({
    username: req.body.username,
    password: req.body.password,
  });
  res.json({ message: "Admin created successfully" });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  const course = await Course.create({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    imageLink: req.body.imageLink,
  });

  const courseId = course._id;

  res
    .status(201)
    .json({ message: "Course created successfully", courseId: courseId });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  const courses = await Course.find();
  res.json({ courses: courses });
});

module.exports = router;
