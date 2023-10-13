const userHackathonSubmitModel = require('./../models/userHackathonSubmit.model')

const submitHackathon = async (req, res, next) => {
  const {
    userId,
    teamId,
    hackathonId,
    submission,
    title,
    status,

  } = req.body
  try {
    const exists = await userHackathonSubmitModel.findOne({ userId, hackathonId });
    console.log(exists, "this is exists")
    const data = await userHackathonSubmitModel.create({
      userId,
      teamId,
      hackathonId,
      submission,
      title,
      status,
    })
    return res.status(200).json({
      message: "success",
      data
    })
  } catch (error) {
    console.log(error);
    const err = new Error()
    err.status = 403
    err.message = error.message
    return next(err)
  }
}

// UserHackathonSubmit
module.exports = { submitHackathon }