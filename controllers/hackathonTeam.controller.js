
const hackathonTeamModel = require("../models/hackathonTeam.model");

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
  const { userId, name, hackathonId } = req.body

  try {
    // work
    return res.status(200).json({
      message: ""
    })
  } catch (error) {
    console.log(error);
    const err = new Error()
    err.status = 403
    err.message = error.message
    return next(err)
  }
}


module.exports = { createTeam, addUserInTeam }