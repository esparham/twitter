const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  image: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  isVerified: { type: Boolean, required: true },
  registeredAt: { type: Date, required: true },
  lastPasswordChange: { type: Date, required: true },
  refreshToken: { type: String, required: false },
  passwordResetToken: { type: String, required: false },
  twitts: [{ type: mongoose.Types.ObjectId, required: false, ref: 'Twitt' }],
  followers: [],
  followings: [],
});

module.exports = mongoose.model('User', userSchema);
