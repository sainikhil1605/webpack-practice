const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");

app.use("/static", express.static(path.resolve(__dirname, "../dist")));
app.get("/", (req, res) => {
  const pathToHtmlFile = path.resolve(__dirname, "../dist/index.html");
  const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, "utf-8");
  res.send(contentFromHtmlFile);
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
