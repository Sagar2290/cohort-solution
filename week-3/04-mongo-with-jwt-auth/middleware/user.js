const { User } = require("../db");
const jwt = require("jsonwebtoken");

const jwtPassword = "secret";

async function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

  const token = req.headers["authorization"].split(" ")[1];

  let username;

  jwt.verify(token, jwtPassword, function (err, decoded) {
    if (err) {
      return res.status(401).json({ message: "Not Allowed" });
    }
    username = decoded.username;
  });
  const user = await User.findOne({ username: username });

  if (!user) {
    return res.status(401).json({ message: "Not Allowed" });
  }
  req.user = user;
  next();
}

module.exports = userMiddleware;
