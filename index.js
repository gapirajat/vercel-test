const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.listen(3000, () => {
  console.log("Running on port 5000.");
});

// // Export the Express API
// module.exports = app;
const express = require("express");
const cors = require("cors");
app.use(express.json());
app.use(cors());






// async function main() {
//   await db.sequelize.sync({force:true})
// }

// main()

db.sequelize.sync().then((result) => {
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  });