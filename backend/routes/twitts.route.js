const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const twittController = require('../controllers/twitts.controller');
const authCheck = require('../middleware/auth.middleware');
const fileUpload = require('../middleware/fileUpload.middleware');

router.get('/:limit/:skip', authCheck, twittController.getTwittsByUser);
// router.get('/:tid', twittController.getTwittById);
// router.get('/', twittController.getTwitts);

router.post(
  '/',
  authCheck,
  fileUpload.single('image'),
  // [check('name').not().isEmpty(), check('twitt').isLength({ min: 5 })],
  twittController.createNewTwitt
);

module.exports = router;
