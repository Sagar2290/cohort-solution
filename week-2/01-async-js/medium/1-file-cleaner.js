const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname + "/test.txt");

fs.readFile(filePath, "utf-8", (err, data) => {
  if (err) {
    console.error("Error in reading file :: ", err);
    return;
  }

  const cleanData = data.replace(/\s+/g, " ").trim();
  fs.writeFile(filePath, cleanData, "utf-8", (err, data) => {
    if (err) {
      console.error("Error in wrinting file :: ", err);
      return;
    }

    console.log("File Cleaned successfully");
  });
});
