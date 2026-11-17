const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.cookies?.token;
  console.log("here the token:", token);
  if (!token) return res.status(401).json({ error: "not authenticated" });
  try {
    req.user = jwt.verify(token, process.env.SECRET);
    next();
  } catch (error) {
    console.error("Token Verification Error:", error);
    return res.status(401).json({ error: "not authenticated" });
  }
};

module.exports = authenticateToken;
