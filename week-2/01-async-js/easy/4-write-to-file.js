const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname + "/test.txt");

fs.writeFile(filePath, "Hello from Sagar!", (err, data) => {
  if (err) return console.error(err);

  console.log("Written successfully");
});

fs.readFile(filePath, "utf-8", (err, data) => {
  if (err) return console.error(err);

  console.log(data);
});
