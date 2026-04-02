const { body } = require("express-validator");

// REGISTER VALIDATION
exports.registerValidation = [
  body("name").notEmpty().withMessage("Name is required"),

  body("email").notEmpty().withMessage("Valid email is required"),

  body("password")
    .notEmpty()
    .withMessage("password is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters"),
];

// LOGIN VALIDATION
exports.loginValidation = [
  body("email").notEmpty().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];
