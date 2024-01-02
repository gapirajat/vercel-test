const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());


const db = require("./models");

const userRouter = require("./routes/User");
app.use("/auth", userRouter);

// async function main() {
//   await db.sequelize.sync({force:true})
// }

// main()

db.sequelize.sync().then((result) => {
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  });