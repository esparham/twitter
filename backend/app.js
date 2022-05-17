const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const env = require('dotenv').config();
const path = require('path');

const userRoutes = require('./routes/user.route');
const twittRoutes = require('./routes/twitts.route');
const HttpError = require('./models/httpError');

//Environment variables
const VERSION = process.env.VERSION;
const DATABASE = process.env.DATABASE;
const PORT = process.env.PORT;

const app = express();
app.use(bodyParser.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));
app.use('/uploads/profiles', express.static(path.join('uploads', 'profiles')));

//Set headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use(`/api/v${VERSION}/user`, userRoutes);
app.use(`/api/v${VERSION}/twitt`, twittRoutes);

//hanlde Unsupported routes
app.use((req, res, next) => {
  return next(new HttpError('This route is not supported', 404));
});

//Error handler
app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred' });
});

//Remove uploaded file on error
app.use((error, req, res, next) => {
  if (req.file) {
    console.log('delete file');
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose
  .connect(DATABASE)
  .then(() => {
    app.listen(PORT);
    console.log(`Listening on port ${PORT}`);
  })
  .catch((err) => {
    console.log(err);
  });
