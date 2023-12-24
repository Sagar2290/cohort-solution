const { Admin } = require("../db");
const jwt = require("jsonwebtoken");

const jwtPassword = "secret";

async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

  const token = req.headers["authorization"].split(" ")[1];

  let username;

  jwt.verify(token, jwtPassword, function (err, decoded) {
    if (err) {
      return res.status(401).json({ message: "Not Allowed" });
    }
    username = decoded.username;
  });
  const admin = await Admin.findOne({ username: username });

  if (!admin) {
    return res.status(401).json({ message: "Not Allowed" });
  }
  req.admin = admin;
  next();
}

module.exports = adminMiddleware;
