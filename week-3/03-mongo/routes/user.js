const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post("/signup", async (req, res) => {
  await User.create({
    username: req.body.username,
    password: req.body.password,
  });
  res.json({ message: "User created successfully" });
});

router.get("/courses", async (req, res) => {
  const courses = await Course.find();
  res.json({ courses: courses });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const course = await Course.findById(req.params.courseId);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $push: {
        purchasedCourses: course,
      },
    }
  );

  return res.json({ message: 'Course purchased successfully' });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const user = await User.findById(req.user._id)
    .populate("purchasedCourses")
    .lean();

  res.json({ purchasedCourses: user.purchasedCourses });
});

module.exports = router;
