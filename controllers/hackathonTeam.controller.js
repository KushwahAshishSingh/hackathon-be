
const hackathonTeamModel = require("../models/hackathonTeam.model");
const invitesService = require("../services/invites.service")
const hackathonTeamService = require("../services/hackathonTeams.service")

const createTeam = async (req, res, next) => {
  const { name, hackathonId } = req.body
  try {
    const team = await hackathonTeamModel.create({ userId: req.user._id, name, hackathonId, usersList: [req.user._id] })
    console.log(team)
    return res.status(200).json({
      message: team
    })
  } catch (error) {
    console.log(error);
    const err = new Error()
    err.status = 403
    err.message = error.message
    return next(err)
  }
}

const addUserInTeam = async (req, res, next) => {
  const { userId, teamId, hackathonId } = req.body

  try {
    return res.status(200).json({
      message: "Invited"
    })
  } catch (error) {
    console.log(error);
    const err = new Error()
    err.status = 403
    err.message = error.message
    return next(err)
  }
}

const inviteUserInTeam = async (req, res, next) => {
  const { userId, teamId, hackathonId } = req.body
  try {
    // work
    const invite = await invitesService.createInviteForHackathon(userId, req.user._id, hackathonId, teamId)
    return res.status(200).json({
      success: true,
      message: "invited"
    })
  } catch (error) {
    console.log(error);
    const err = new Error()
    err.status = 403
    err.message = error.message
    return next(err)
  }
}

const getUserInvites = async (req, res, next) => {
  const data = await invitesService.getUserPendingInvites(req.user._id)
  return res.status(200).json({
    success: true,
    data: data
  })
}

const acceptHackathonInvite = async (req, res, next) => {
  try {
    const invite = await invitesService.getInvite(req.body.inviteId, req.user._id)

    // check user in any team 
    

    if (await hackathonTeamService.checkUserInAnyTeam(req.user._id, invite.hackathonId)) {
      const rejectInvites = await invitesService.rejectPendingHackathonInvites(invite)
      const err = new Error()
      err.status = 403
      err.message = "You already joined a team"
      return next(err)
    }

    // add user to team 
    const team = await hackathonTeamService.addTeamMember(req.user._id, invite.hackathonId, invite.teamId)

    const acceptInvite = await invitesService.acceptHackathonInvite(invite)

    return res.status(200).json({
      success: true,
      message: "Invite accepted "
    })

  } catch (error) {
    console.log(error);
    const err = new Error()
    err.status = 403
    err.message = error.message
    return next(err)
  }
}


module.exports = { createTeam, addUserInTeam, inviteUserInTeam, getUserInvites, acceptHackathonInvite }