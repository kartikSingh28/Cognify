const jwt = require("jsonwebtoken");
const config = require("../config"); 

function userMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.token;

  if (!authHeader) {
    return res.status(401).json({
      message: "Authorization denied. No token provided.",
    });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  try {
    const decoded = jwt.verify(token, config.JWT_USER_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error("JWT Verification Error:", err.message);
    return res.status(403).json({
      message: "Invalid or expired token",
    });
  }
}

module.exports = { userMiddleware };
