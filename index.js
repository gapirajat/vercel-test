const express = require("express");

const app = express();
const router = express.Router()

// // Export the Express API
// module.exports = app;
const cors = require("cors");
app.use(express.json());
app.use(cors());


// Defining a route handler for GET request on /api
router.get('/', (req, res) => {
  res.send('Hello from API!')
})

// Using the router middleware in the app
app.use('/api', router)



// async function main() {
//   await db.sequelize.sync({force:true})
// }

// main()

db.sequelize.sync().then((result) => {
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  });