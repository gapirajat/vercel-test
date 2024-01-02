const express = require("express");
const router = express.Router();
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");

router.get("/test", async (req, res) => {

  res.json("WORKING");
});

// ../auth/ For new user
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name: name,
      password: hash,
      email: email,
    });
    res.json("SUCCESS");
  });
  } catch (error) {
    console.log(error);
  }

});

// ../auth/login
router.post("/login", async (req, res) => {

  const { name, password } = req.body;
  const user = await User.findOne({ where: { name: name } });
  if (!user) res.json({ error: "User Doesn't Exist" });

  try {
    bcrypt.compare(password, user.password).then(async (match) => {
      if (!match) res.json({ error: "Wrong Username And Password Combination" });
  
      const accessToken = sign(
        { name: user.name, id: user.id },
        "importantsecret"
      );
      res.json({ token: accessToken, name: name, id: user.id });
    });
    
  } catch (error) {
    console.log(error);
  }



});

//  ../auth/auth client sends its token and is parsed and resent to the client
router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

// ../auth/login no use ?
router.get("/login",(req,res)=>{
  res.json(req.user)
} ) 

// ../auth/basicinfo/123
router.get("/basicinfo/:id", async (req, res) => {
  const id = req.params.id;

  const basicInfo = await User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });

  res.json(basicInfo);
});

// ../list list
router.get("/list", validateToken, async (req, res) => {

  const list = await User.findAll({
    attributes: { exclude: ['password'] }
  });

  res.json(list);
});




// ../auth/changepassword/
router.put("/changepassword", validateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findOne({ where: { name: req.user.name } });

  bcrypt.compare(oldPassword, user.password).then(async (match) => {
    if (!match) res.json({ error: "Wrong Password Entered!" });

    bcrypt.hash(newPassword, 10).then((hash) => {
      User.update(
        { password: hash },
        { where: { name: req.user.name } }
      );
      res.json("SUCCESS");
    });
  });
});

module.exports = router;