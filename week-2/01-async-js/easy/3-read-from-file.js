const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname + "/test.txt");

fs.readFile(filePath, 'utf-8', function (err, data) {
  if (err) {
    return console.log(err)
  }
  console.log(data)
});
