const teamsModel = require('../models/hackathonTeam.model')
const hackathonModel = require('../models/admin/hackathon')


const addTeamMember = async (userId, hackathonId, teamId) => {
    const getHackathonPromise = hackathonModel.findById(hackathonId)
    const getTeamPromise = teamsModel.findById(teamId)

    const [hackathon, team] = await Promise.all([getHackathonPromise, getTeamPromise])
    console.log(hackathon, team);
    if (!hackathon || !team) {
        throw new Error("team or hackathon not found")
    }

    if (team.usersList.length >= hackathon.teamSize) {
        throw new Error("team is full")
    }

    team.usersList.push(userId)
    await team.save()
}

const checkUserInAnyTeam = async (userId, hackathonId) => {
    const userTeam = await teamsModel.aggregate([
        {
            $match: {
                hackathonId: hackathonId
            }
        }, {
            $unwind: "$usersList"
        }, {
            $match: {
                userId: userId
            }
        }
    ])
    if (!userTeam.length) {
        return false
    }
    return true
}





module.exports = { addTeamMember, checkUserInAnyTeam }