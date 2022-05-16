const jwt = require('jsonwebtoken');
const HttpError = require('../models/httpError');
const User = require('../models/user.model');

const authChech = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      next(new HttpError('Authentication failed.', 401));
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    try {
      const user = await User.findById(decodedToken.userId);
      if (!user) {
        next(new HttpError('Authentication failed.', 401));
      }
      //Check if user changed password after issuing token
      if (
        new Date(user.lastPasswordChange) > new Date(decodedToken.issueDate)
      ) {
        next(
          new HttpError('Password changed after login. Login again please', 401)
        );
      }
    } catch (err) {
      next(new HttpError('Authentication failed.', 401));
    }

    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    next(new HttpError('Authentication failed.', 401));
  }
};

module.exports = authChech;
