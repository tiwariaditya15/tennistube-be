const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const decoded = jwt.verify(token, process.env.SECRET);
      req.userId = decoded.userId;
      return next();
    }
    return res.status(401).json({ message: "Token is missing." });
  } catch (error) {
    return res.status(401).json({ error });
  }
};

module.exports = verifyToken;
