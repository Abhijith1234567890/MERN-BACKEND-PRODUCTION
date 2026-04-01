const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const AppError = require("../utils/AppError");

// REGISTER
exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new AppError("Email already registered", 400));
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  res.status(201).json({
    status: "success",
    message: "User registered",
    user,
  });
};

// LOGIN
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Invalid email or password", 401));
  }

  const token = generateToken(user._id);

  return res.json({
    message: "Login successful",
    token,
  });
};

// PROTECTED ROUTE
exports.getTasks = (req, res) => {
  res.json({
    status: "success",
    message: "Protected data",
    userId: req.user,
  });
};
