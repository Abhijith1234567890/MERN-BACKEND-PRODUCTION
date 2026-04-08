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

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered
 */
router.post("/register",registerValidation, validate, register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login success
 */
router.post("/login",loginValidation, validate, login);

// Protected route
router.get("/tasks", authMiddleware, getTasks);

module.exports = router;
