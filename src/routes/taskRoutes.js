const express = require("express");
const router = express.Router();

const { getTasks, createTask } = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);

module.exports = router;
