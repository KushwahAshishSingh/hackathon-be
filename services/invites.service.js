const invitesModel = require('../models/invites.model')
const teamsModel = require('../models/hackathonTeam.model')
const { checkUserInAnyTeam } = require('./hackathonTeams.service')

const createInviteForHackathon = async (userId, invitedBy, hackathonId, teamId) => {
    if (await checkUserInAnyTeam(userId, hackathonId)) {
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
    return invitesModel.aggregate([
        {
            $match: {
                $and: [
                    { userId: userId },
                    { status: "pending" }
                ]
            }
        }, {
            $lookup: {
                from: 'users',
                localField: 'requestedBy',
                foreignField: '_id',
                as: 'requestedBy'
            }
        }, {
            $lookup: {
                from: 'hackathonteams',
                localField: 'teamId',
                foreignField: '_id',
                as: 'team'
            }
        }, {
            $lookup: {
                from: 'hackathons',
                localField: 'hackathonId',
                foreignField: '_id',
                as: 'hackathon'
            }
        }, {
            $unwind: '$requestedBy'
        }, {
            $unwind: '$team'
        }, {
            $unwind: '$hackathon'
        },
        {
            $project: {
                _id: 1,
                teamId: 1,
                hackathonId: 1,
                'requestedBy.name': 1,
                'team.name': 1,
                'hackathon': 1
            }
        }
    ])
}

const getInvite = async (inviteId, userId) => {
    let invite = await invitesModel.findOne({ _id: inviteId, userId })
    if (!invite) {
        throw new Error('invite not found')
    }
    return invite
}

const acceptHackathonInvite = async (invite) => {
    invite.status = 'accepted'
    await invite.save()
    await rejectPendingHackathonInvites(invite)
    return invite.hackathonId
}

const rejectPendingHackathonInvites = async (invite) => {
    await invitesModel.updateMany({
        hackathonId: invite.hackathonId,
        userId: invite.userId,
        status: { $ne: 'accepted' }
    }, {
        $set: {
            status: 'rejected'
        }
    })
    return invite.hackathonId
}


module.exports = {
    createInviteForHackathon,
    getUserPendingInvites,
    acceptHackathonInvite,
    getInvite,
    rejectPendingHackathonInvites
}