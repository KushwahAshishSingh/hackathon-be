
const hackathonTeamModel = require("../models/hackathonTeam.model");
const invitesService = require("../services/invites.service")
const createTeam = async (req, res, next) => {
  const { userId, name } = req.body

  try {
    const team = await hackathonTeamModel.create({ userId, name })
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
  const data = invitesService.getUserPendingInvites(req.user._id)
  return res.status(200).json({
    success: true,
    data: data
  })
}

const acceptHackathonInvite = async (req, res, next) => {
  try {
    const hackathonId = invitesService.acceptHackathonInvite(req.body.inviteId)
    
    return res.status(200).json({
      success: true,
      message: "invite accepted"
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