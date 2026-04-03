const Task = require("../models/Task");
const AppError = require("../utils/AppError");

// CREATE TASK
exports.createTask = async (req, res, next) => {
  const { title, description, status } = req.body;

  if (!title) {
    return next(new AppError("Title is required", 400));
  }

  const task = Task.create({
    title,
    description,
    status,
    user: req.user,
  });

  res.status(201).json({
    status: "success",
    data: task,
  });
};

// GET TASKS
exports.getTasks = async (req, res, next) => {
  const { page = 1, limit = 10, status, search } = req.query;

  const query = {
    user: req.user,
  };

  // FILTER
  if (status) {
    query.status = status;
  }

  // SEARCH
  if (search) {
    query.title = { $regex: search, $option: "i" };
  }

  const skip = (page - 1) * limit;

  const tasks = await Task.find(query)
    .skip(skip)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  const total = await Task.countDocuments(query);

  res.json({
    status: "success",
    page: Number(page),
    total,
    results: tasks.length,
    data: tasks,
  });
};
