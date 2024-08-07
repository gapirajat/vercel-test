const express = require("express");
const cors = require("cors");
require('pg')
const app = express();
app.use(express.json());

const corsOption = {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}
app.use(cors(corsOption));


const db = require("./models/index");

const userRouter = require("./routes/User");
app.use("/auth", userRouter);
const ChatRouter = require("./routes/ChatRoute");
app.use("/chat", ChatRouter);
const postRouter = require("./routes/postRoute");
app.use("/post", postRouter);

// async function main() {
//   await db.sequelize.sync({force:true})
// }

// main()


db.sequelize.sync({alter:true}).then((result) => {
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  });

