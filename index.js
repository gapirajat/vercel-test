const express = require("express");
const cors = require("cors");
require('pg')
const app = express();
app.use(express.json());
const rateLimit = require('express-rate-limit');

const corsOption = {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE","OPTIONS"],
    allowedHeaders: ['Content-Type', 'Authorization'],
}
app.use(cors(corsOption));
const db = require("./models/index");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later."
});
app.use(limiter);



const userRouter = require("./routes/User");
app.use("/auth", userRouter);
const ChatRouter = require("./routes/ChatRoute");
app.use("/chat", ChatRouter);
const postRouter = require("./routes/Post");
app.use("/post", postRouter);

// async function main() {
//   await db.sequelize.sync({force:true})
// }

// main()

// export default app;

db.sequelize.sync().then((result) => {
    app.listen(3001, () => {
      console.log("Server running on port 3001");
    });
  });

