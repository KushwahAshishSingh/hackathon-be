const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HackathonTeamSchema = new Schema({

  hackathonId: {
    type: mongoose.Types.ObjectId,
    require: true
  },
  userId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  usersList: {
    type: [String],
  }

}, { timestamps: true })

module.exports = HackathonTeams = mongoose.model('hackathonteam', HackathonTeamSchema)
