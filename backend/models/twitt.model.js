const mongoose = require('mongoose');

const twittSchema = new mongoose.Schema({
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  text: { type: String, required: true },
  image: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  likedBy: [{ type: mongoose.Types.ObjectId, required: false, ref: 'User' }],
  comments: [
    {
      commneterId: {
        type: mongoose.Types.ObjectId,
        required: false,
        ref: 'User',
      },
      comment: { type: String, required: false },
    },
  ],
});

module.exports = mongoose.model('Twitt', twittSchema);
