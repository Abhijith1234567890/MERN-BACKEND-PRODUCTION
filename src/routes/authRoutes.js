const express = require("express");
const router = express.Router();

const rateLimit = require("express-rate-limit");

// Limit login/register requests
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // max 5 requests
  message: {
    status: "fail",
    message: "Too many requests, try again later",
  },
});

const { register, login, getTasks } = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");
const validate = require("../middleware/validateMiddelware");
const {
  registerValidation,
  loginValidation,
} = require("../validators/authValidator");

// Apply limiter
router.post("/register", authLimiter, registerValidation, validate, register);
router.post("/login",authLimiter, loginValidation, validate, login);

// Protected route
router.get("/tasks", authMiddleware, getTasks);

module.exports = router;
