const jwt = require("jsonwebtoken");

const checkaAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Bearer fdkjsdnfkj#$##$@#
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decodedToken;
    next(); // to call next middlewares
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized or invalid token",
      error: err,
    });
  }
};

module.exports = { checkaAuth };
