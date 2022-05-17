const { validationResult } = require('express-validator');
const HttpError = require('../models/httpError');
const Twitt = require('../models/twitt.model');

const getTwitts = (req, res, next) => {
  res.json({ message: 'Get /' });
};

const getTwittById = (req, res, next) => {
  const twittId = req.params.tid;

  const twittNotFound = false;
  if (twittNotFound) {
    return next(new HttpError('Could not find twitt with this Id.', 404));
  }

  res.json({ message: `Get /:tid ${twittId}` });
};

const getTwittsByUser = async (req, res, next) => {
  const { limit, skip } = req.params;
  const userId = req.userData.userId;

  let twitts = [];
  try {
    twitts = await Twitt.find({ creator: userId })
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });
  } catch (err) {
    return res.status(500).json({ msg: 'Something went wrong.' });
  }

  if (!twitts) {
    return res.status(404).json({ msg: 'No twiit found.' });
  }

  res.status(200).json(twitts);
};

const createNewTwitt = async (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   console.log(errors);
  //   return next(new HttpError('Invalid inputs passed', 422));
  // }
  const { text } = req.body;
  const image = req.file.path;

  const newTwitt = new Twitt({
    creator: req.userData.userId,
    text,
    image,
  });

  try {
    newTwitt.save();
  } catch (err) {
    next(new HttpError('Failed to create twitt', 401));
  }

  res.status(201).json({ message: 'Successfull', twittId: newTwitt.id });
};

module.exports = {
  getTwitts,
  getTwittById,
  createNewTwitt,
  getTwittsByUser,
};
