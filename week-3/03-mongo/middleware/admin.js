const { Admin } = require("../db");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const admin = await Admin.findOne({ username: req.headers["username"] });

  if (!admin) {
    return res.status(401).json({ message: "Not Allowed" });
  }
  req.admin = admin;
  next();
}

module.exports = adminMiddleware;
