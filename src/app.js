const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const AppError = require("./utils/AppError");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

// Create logs folder if not exists
const logDir = path.join(__dirname, "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Morgan stream (write to file)
const accessLogStream = fs.createWriteStream(path.join(logDir, "combined.log"), {
  flags: "a",
});

// Middleware
app.use(express.json());
app.use(cors());

// Log all requests
app.use(morgan("combined", {stream: accessLogStream}))

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// Handle unknown routes
app.use((req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

// Global error middleware (LAST)
app.use(errorMiddleware);

module.exports = app;
