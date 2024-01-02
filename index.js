const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.listen(3000, () => {
  console.log("Running on port 5000.");
});