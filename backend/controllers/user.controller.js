const User = require('../models/user.model');
const { validationResult } = require('express-validator');
const HttpError = require('../models/httpError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/emailSender');

const generateToken = (userId) => {
  let token;
  try {
    token = jwt.sign(
      { userId, issueDate: new Date() },
      process.env.SECRET_KEY,
      {
        expiresIn: '1h',
      }
    );
    return token;
  } catch (err) {
    new HttpError('Faild to generate token.', 500);
  }
};

const signUp = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new HttpError('Invalid inputs', 401));
  }

  const { firstName, lastName, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new HttpError('Email address already exists.', 500));
    }
  } catch (err) {
    return next(new HttpError('Faile', 500));
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new HttpError('Faild to register user.', 500));
  }

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    isVerified: false,
    registeredAt: new Date(),
    lastPasswordChange: new Date(),
    refreshToken: '',
    passwordResetToken: '',
    followers: [],
    followings: [],
  });

  try {
    await newUser.save();
  } catch (err) {
    console.log(err);
    return next(new HttpError('Faild to register user.', 500));
  }

  const token = generateToken(newUser.id);

  res.status(201).json({
    message: 'Registered successfully.',
    user: {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      token,
    },
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const logInUser = await User.findOne({ email });
  if (!logInUser) {
    return next(new HttpError('No user find.', 404));
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, logInUser.password);
  } catch (err) {
    return next(new HttpError('Could not log in user.', 500));
  }

  if (!isValidPassword) {
    return next(new HttpError('Invalid creedentials.', 401));
  }

  const token = generateToken(logInUser.id);
  res.status(200).json({ status: 'success', token });
};

const resetPassword = async (req, res, next) => {
  const { password, newPassword } = req.body;

  let existingInfo;
  try {
    existingInfo = await User.findById(req.userData.userId);
  } catch (err) {
    return next(new HttpError('Could not find the user.', 500));
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingInfo.password);
    if (!isValidPassword) {
      return next(new HttpError('Currrent password is not valid', 500));
    }
  } catch (err) {
    return next(new HttpError('Something went wrong', 500));
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(newPassword, 12);
  } catch (err) {
    return next(new HttpError('Something went wrong', 500));
  }

  try {
    await User.findByIdAndUpdate(req.userData.userId, {
      password: hashedPassword,
      lastPasswordChange: new Date(),
    });
  } catch (err) {
    return next(new HttpError('Something went wrong', 500));
  }

  res.status(201).json({ status: 'success' });
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  let user;
  try {
    user = await User.findOne({ email });
    if (!user) {
      return next(
        new HttpError('There is no user with this email address.', 404)
      );
    }
  } catch (err) {
    return next(new HttpError('Error.', 500));
  }

  try {
    const passwordResetToken = crypto.randomUUID();
    const encryptedPasswordResetToken = await bcrypt.hash(
      passwordResetToken,
      12
    );
    await User.findOneAndUpdate(
      { email },
      { passwordResetToken: encryptedPasswordResetToken }
    );

    console.log('try send mail');
    await sendEmail({ email, passwordResetToken });
    console.log('Mail done');
    res
      .status(200)
      .json({ message: 'Password reset link sent to your email.' });
  } catch (err) {
    return next(new HttpError('Error.', 500));
  }
};

const changePassword = async (req, res, next) => {
  const { email, password, resetToken } = req.body;

  let existUser;

  try {
    existUser = await User.findOne({ email });
    if (!existUser) {
      new HttpError('Token is not valid.', 404);
    }
    // const hashedToken = await bcrypt.hash(resetToken, 12);
    const tokenCheck = await bcrypt.compare(
      resetToken,
      existUser.passwordResetToken
    );
    if (!tokenCheck) {
      new HttpError('Token is not valid.', 404);
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await User.findOneAndUpdate(
      { email },
      { password: hashedPassword, lastPasswordChange: new Date() }
    );
    res.status(200).json({ message: 'Password reset successfully.' });
  } catch (err) {
    new HttpError('Token is not valid.', 404);
  }
};

const userInfo = async (req, res, next) => {
  try {
    const userId = req.userData.userId;
    const user = await User.findById(userId); //TODO remove extra info
    res.status(200).json(user);
  } catch (err) {
    next(new HttpError('Something went wrong', 500));
  }
};

const getAllUsers = async (req, res, next) => {
  const users = await User.find();

  res.json({ users });
};

module.exports = {
  signUp,
  login,
  resetPassword,
  forgotPassword,
  changePassword,
  userInfo,
  getAllUsers,
};
