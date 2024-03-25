const express = require("express");
const {User} = require("../model/userModel");
const bcrypt = require("bcryptjs");
const errorHandler = require("../utils/error");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const sendToken = require('../utils/sendToken');


dotenv.config();
const saltRounds = 10;

async function handleNewUser(req, res){
  const { username, email, password } = req.body;
  if(!username || !email || !password){
      return next(errorHandler(400, "Please fill all the fields"))
  };
  const duplicateUser = await User.findOne({ username: username, email: email });
  if(duplicateUser){
      res.status(400).json({
          msg: "Duplicate user found",
      });
  };
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log(hashedPassword);
  try {
      
      const user = new User({
          username,
          email,
          password: hashedPassword,
      });
      await user.save();
      sendToken(user, 200, res);
      // res.status(200).json({
      //     msg: "User saved successfully",
      // });
  } catch (error) {
      console.error(error);
  };
};

async function handleLogin(req, res, next) {
  const name = req.body.username;
  const password = req.body.password;
  if (!name || !password) {
    next(errorHandler(400, "All fields are required"));
  }
  try {
    const validUser = await User.findOne({ username: name }).select("+password");

    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const storedHashedPassword = validUser.password;
    
    const validPassword = await bcrypt.compare(password, storedHashedPassword);

    if (!validPassword) {
      return next(errorHandler(404, "Invalid Credentials"));
    }

    const { password: pass, profilePicture: proPic, ...rest } = validUser._doc;
    sendToken(rest, 200, res);
  } catch (err) {
    console.error(err);
  }
}

async function handleLogout(req, res, next) {
  const cookies = req.cookies;
  console.log(cookies);
  try {
    if (cookies) {
      res.clearCookie("token", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      res.json({
        msg: "Cookie cleared. User logged out successfully",
      });
    }
  } catch (error) {
    res.json({
      msg: error,
    });
  }
}

async function handleGetUser(req, res, next) {
  
  const user = await User.findOne({ username: req.user.username});

  res.json({
    succcess: true,
    user,
  })  
}

async function handleGoogleAuth(req, res, next) {
  const { email, username, googlePhotoURL } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (validUser) {
      sendToken(validUser, 200, res);
    } else {
      console.log('No sign in as user does not exist. reached sign up instead.');
      const generatePassword = Math.round().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatePassword, saltRounds);
      // console.log(username);
      const newUser = new User({
        username: username.toLowerCase().split(' ').join('') + Math.round().toString(9).slice(-4),
        email: email,
        password: hashedPassword,
        profilePicture: googlePhotoURL,
      });
      await newUser.save();
      res.status(200).json({
        msg: 'New user saved successfully',
      });
    }
  } catch (error) {
    next(error);
  } 
}

module.exports = { handleNewUser, handleLogin, handleLogout, handleGoogleAuth, handleGetUser };
