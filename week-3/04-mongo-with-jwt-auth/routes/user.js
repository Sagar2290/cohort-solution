const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const jwt = require("jsonwebtoken");

const jwtPassword = "secret";

// User Routes
router.post("/signup", async (req, res) => {
  await User.create({
    username: req.body.username,
    password: req.body.password,
  });
  res.json({ message: "User created successfully" });
});

router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({username});
  if (!user) {
    return res.status(404).json({ message: "Admin not exist" });
  }
  if (user.password != password) {
    return res.status(404).json({ message: "Wrong password" });
  }
  const token = jwt.sign({ username: username }, jwtPassword);

  res.json({ token: token });
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
