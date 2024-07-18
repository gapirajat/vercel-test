const express = require("express");
const router = express.Router();
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");
const db = require("../models/index");
const handleSequelizeError = require("../errorHandler");

// ../auth/ For new user
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const { name, email, password, cin, status } = req.body;
    await bcrypt.hash(password, 10).then(async (hash) => {
      const user = await User.create({
        name: name,
        password: hash,
        email: email,
        cin: cin,
        status: status
      });
      res.status(201).json({ message: "User created successfully", user });
    });
  } catch (error) {
    console.error(error);
    handleSequelizeError(error, res);
    return;
  }

});

// ../auth/login
router.post("/login", async (req, res) => {


  try {
    const { email, password } = req.body;

    // Check if email is provided
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      res.status(404).json({ error: "User Doesn't Exist" });
      return;
    }

    bcrypt.compare(password, user.password).then(async (match) => {
      if (!match) res.json({ error: "Wrong Username And Password Combination" });

      console.log(user.email);
      const accessToken = sign(
        { status: user.status, id: user.uid, name: user.name },

        "importantsecret"
      );
      res.status(200).json({ token: accessToken, name: user.name, status: user.status });
    });

  } catch (error) {
    console.log(error);
    handleSequelizeError(error, res);
    res.status(500).json({ error: "An error occurred while creating!" });
  }

});


router.get("/test", async (req, res) => {
  res.status(200).json({ message: "WORKING" });
});

//  ../auth/auth client sends its token and is parsed and resent to the client
router.get("/auth", validateToken, (req, res) => {
  res.status(200).json(req.user);
});

// ../auth/login no use ?
router.get("/login", validateToken, (req, res) => {
  res.json(req.user)
})

// ../auth/basicinfo/123
router.get("/basicinfo/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const basicInfo = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    res.status(200).json(basicInfo)
  } catch (error) {
    console.error(error);
    handleSequelizeError(error,res);
  }
  ;
});

// ../list list
router.get("/list", validateToken, async (req, res) => {
  try {
      const list = await User.findAll({
    attributes: { exclude: ['password'] }
  });
  res.status(200).json(list);
  } catch (error) {
    console.error(error);
    handleSequelizeError(error,res);
  }


});




// ../auth/changepassword/
router.put("/changepassword", validateToken, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findOne({ where: { name: req.user.name } });

    bcrypt.compare(oldPassword, user.password).then(async (match) => {
      if (!match) {
        res.json({ error: "Wrong Password Entered!" });
        return;
      }


      bcrypt.hash(newPassword, 10).then((hash) => {
        User.update(
          { password: hash },
          { where: { name: req.user.name } }
        );
        res.json("SUCCESS");
      });
    });
  } catch (error) {
    console.error(error);
    handleSequelizeError(error,res);

  }

});

// .../auth/update/true
router.put("/update/:newLogin", validateToken, async (req, res) => {
  const { newLogin } = req.params;
  console.log(newLogin);

  try {
    const {
      company_name,
      sector,
      size,
      location,
      company_desc } = req.body;

    const t = await db.sequelize.transaction();

    const { name, id } = req.user;
    // const user = await User.findOne({ where: { uid: id, name: name } });

    User.update(
      {
        company_name,
        sector,
        size,
        location,
        company_desc
      },
      { where: { uid: id, name: name } },
      () => {
        if (newLogin == 'true' && newLogin) {
          return '{ transaction: t}';
        }
        return;
      }
    );
    res.json("SUCCESS");
    setTimeout(async () => {
      // Function to run after the delay
      await t.rollback();
    }, 5000);

  } catch (error) {
    console.log(error)
    if (newLogin == 'true' && newLogin) {
      await t.rollback();
    }
    handleSequelizeError(error,res);
    return;

  }
});


module.exports = router;