const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization header is missing" });
  }

  const token = authorization.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ error: "Token is missing in Authorization header" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(decoded._id).select("_id");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token has expired" });
    }
    return res.status(401).json({ error: "Invalid or malformed token" });
  }
};

module.exports = requireAuth;
