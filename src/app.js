const express = require("express");
const cors = require("cors");
const AppError = require("./utils/AppError");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
// app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// Handle unknown routes
app.use((req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

// Global error middleware (LAST)
app.use(errorMiddleware);

module.exports = app;
