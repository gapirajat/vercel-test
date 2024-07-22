const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.json({ error: "User not logged in!" });

  try {
    console.log(accessToken)
    const validToken = verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJzZWVrZXIiLCJpZCI6MSwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNzIxNjU3OTkzfQ.qkdqgcIXDUCbzGAqBx7Tb_iJtcvYc6e77-D1gelBxOI", "importantsecret");
    req.user = validToken; //decodes the token's payload and attaches it to the req object
    //user infor from validToken
    
    if (validToken) {
      return next();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err,accessToken)
  }
};

module.exports = { validateToken };