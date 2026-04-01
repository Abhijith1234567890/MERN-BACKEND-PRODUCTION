const User = require("../models/User")
const bcrypt = require("bcryptjs")
const generateToken = require("../utils/generateToken")

// REGISTER
exports.register = async (req, res) => {
  const {name, email, password} = req.body

  try {
    const userExists = await User.findOne({email})
    if (userExists) {
      return res.status(400).json({message: "User already exists"})
    }

    const user = await User.create({
      name,
      email,
      password
    })

    res.status(201).json({
      message: "User registered",
      user
    })
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

// LOGIN
exports.login = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user._id)

      return res.json({
        message: "Login successful",
        token
      })
    } else {
      return res.status(401).json({message: "Invalid credentials"})
    }
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

// PROTECTED ROUTE
exports.getTasks = (req, res) => {
  res.json({
    message: "Protected tasks data",
    userId: req.user
  })
}