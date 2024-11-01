//ValidateToken middleware first checks if a token is present in the request header(header help carry important information between client and server
//)to confirm that the user is authenticated.
//1.check for token
//2. verify user identity
//3.proceed if valida
//4.Block if invalid

const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.json({ error: "User not logged in!" });

  try {
    const validToken = verify(accessToken, "importantsecret");
    req.user = validToken;
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken };
