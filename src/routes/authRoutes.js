const express = require("express");
const router = express.Router();

const { register, login, getTasks } = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");
const validate = require("../middleware/validateMiddelware");
const { registerValidation, loginValidation } = require("../validators/authValidator");

router.post("/register",registerValidation, validate, register);
router.post("/login",loginValidation, validate, login);

// Protected route
router.get("/tasks", authMiddleware, getTasks);

module.exports = router;
