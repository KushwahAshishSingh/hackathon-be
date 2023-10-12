const invitesModel = require('../models/invites.model')
const teamsModel = require('../models/hackathonTeam.model')

const createInviteForHackathon = async (userId, invitedBy, hackathonId, teamId) => {

    // user is added to any team 
    let userTeam = await teamsModel.aggregate([
        {
            $match: {
                hackathonId: hackathonId
            }
        }, {
            $unwind: "usersList"
        }, {
            $match: {
                "$usersList": userId
            }
        }
    ])

    if (userTeam) {
        throw new Error('user already in a team')
    }

    // create invite 
    return invitesModel.create({
        requestedBy: invitedBy,
        userId: userId,
        teamId: teamId,
        hackathonId: hackathonId
    })
}

const getUserPendingInvites = async (userId) => {
    return invitesModel.find({
        userId: userId,
        status: "pending"
    })
}

const acceptHackathonInvite = async (inviteId) => {
    let invite = await invitesModel.findById(inviteId)
    if (!invite) {
        throw new Error('invite not found')
    }
    invite.status = 'accepted'
    await invite.save()

    // reject rest 
    await invitesModel.aggregate([
        {
            $match: {
                $and: [
                    {
                        hackathonId: invite.hackathonId
                    }, {
                        status: { $ne: 'accepted' }
                    }
                ]

            }
        }, {
            $set: {
                status: 'rejected'
            }
        }
    ])

    return invite.hackathonId
}



module.exports = { createInviteForHackathon, getUserPendingInvites, acceptHackathonInvite }