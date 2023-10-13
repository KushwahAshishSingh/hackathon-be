const mongoose = require('mongoose');
const Schema = mongoose.Schema

const answerSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  }
);


const UserHackathonSubmit = new Schema({
  userId: {
    type: String,
    required: true,
    // unique: true
  },
  teamId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  hackathonId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  submission: [answerSchema],
  title: {
    type: String
  },
  status: {
    type: String,
    enum: ["Submitted"],
    default: "Submitted"
  },

  comment: {
    type: String,
    maxLength: 500,
  }
}, { timestamps: true })

module.exports = UserHackathon = mongoose.model("userhackathonsubmission", UserHackathonSubmit)