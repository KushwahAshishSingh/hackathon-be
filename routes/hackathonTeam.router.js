const express = require('express');
const router = express.Router();
// const authController = require('../controllers/auth.controller')
// const authValidators = require('../middlewares/validators/auth.validator');
const hackathonTeamValidator = require('../middlewares/validators/hackathonTeam.validator');
const hackathonTeam = require('../controllers/hackathonTeam.controller');

router.post('/create-team', hackathonTeamValidator.createTeamValidator, hackathonTeam.createTeam);
router.post('/add-user-in-team', hackathonTeamValidator.addUserTeamValidator, hackathonTeam.addUserInTeam)
router.post('/invite-to-team', hackathonTeamValidator.inviteUserTeamValidator, hackathonTeam.inviteUserInTeam)

module.exports = router;
