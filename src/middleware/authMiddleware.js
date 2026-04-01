const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const authMiddleware = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded.id;

      return next();
    } catch (err) {
      return next(new AppError("Invalid token", 401));
    }
  }

  return next(new AppError("No token provided", 401))
};

module.exports = authMiddleware;
