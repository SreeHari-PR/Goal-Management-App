const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  if (!name || !email || !password) {
    console.log(name, email, password);
    res.status(400).json({ error: "invalid User" });

  }
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("user already exist");
  }
  const secure_password = await securePassword(password);

  const user = await User.create({
    name,
    email,
    password: secure_password,
    isAdmin,
  });
  if (user) {
    res.status(201).json({
      mobile: user.mobile,
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,

      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({ message: "invalid email" });
  }
  console.log(user.password, "kkkkk", password);
  const passwordMatch = await bcrypt.compare(password, user.password);
  console.log(passwordMatch, "llll");
  if (user && passwordMatch && user.isAdmin === 0 && user.is_blocked) {
    res.status(200).json({
      mobile: user.mobile,
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,

      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "invalid user data" });
  }
});

const editUser = asyncHandler(async (req, res) => {
  try {
    const { userId, name, email, mobile, image } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { name, email, mobile, image },
      { new: true }
    );

    if (user) {
      res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,

        token: req.headers.authorization,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

module.exports = {
  registerUser,
  loginUser,
  getMe,
  editUser,
}