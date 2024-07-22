const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.json({ error: "User not logged in!" });

  try {
    console.log(accessToken)
    const validToken = verify(accessToken, "importantsecret");
    req.user = validToken; //decodes the token's payload and attaches it to the req object
    //user infor from validToken
    
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err },accessToken);
  }
};

module.exports = { validateToken };