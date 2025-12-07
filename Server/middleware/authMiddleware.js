// To Protect Routes - Authentication Middleware for JWT Authentication

const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ msg: "No token. Authorization denied" });
  }

  try {
    const jwtToken = token.split(" ")[1];
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is invalid" });
  }
};

module.exports = auth;



