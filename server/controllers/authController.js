// const errorHandler = require("../middlewares/errorMiddleware");
const jwt = require('jsonwebtoken');
const userModel = require("../models/userModel");
const errorResponse = require("../utils/errorResponse");
// const cookieParser = require('cookie-parser');

// exports.sendToken = (user, statusCode, res) => {
//   // const token = user.getSignedToken(res); 
//   // const token = jwt.sign({ user }, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIREIN });
//   // res.status(statusCode).json({
//   //   success: true,
//   //   token,
//   // });

// };
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: maxAge,
  });
};

exports.getuserId = async (req, res) => {
  try{
    const {email} = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const objectId = user._id;
        // console.log(userId);
        // const checkuserId = await userModel.findById({userId});
        // console.log(checkuserId);
    if (!objectId) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({objectId}); 
  }catch (error) {
    console.log(error);
  }
};

exports.registerContoller = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const exisitingEmail = await userModel.findOne({ email });
    if (exisitingEmail) {
      return next(new errorResponse("Email is already registered", 500));
    }
    const user = await userModel.create({ username, email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ token });
    // res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    // res.status(201).json({ user: user._id });
    // this.sendToken(user, 201, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new errorResponse("Please provide email or password"));
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return next(new errorResponse("Invalid Credentials", 401));
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return next(new errorResponse("Invalid Credentials", 401));
    }
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ token });
    // res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    // res.status(200).json({ user: user._id });
    // this.sendToken(user, 200, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.logoutController = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  return res.status(200).json({
    success: true,
    message: "Logged out Succesfully",
  });
};