const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HackathonTeamInvitesSchema = new Schema({
    requestedBy: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    teamId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    hackathonId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    }
}, { timestamps: true })

module.exports = HackathonTeamInvites = mongoose.model('HackathonTeamInvites', HackathonTeamInvitesSchema)
