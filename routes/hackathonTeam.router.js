const express = require('express');
const router = express.Router();
// const authController = require('../controllers/auth.controller')
// const authValidators = require('../middlewares/validators/auth.validator');
const hackathonTeamValidator = require('../middlewares/validators/hackathonTeam.validator');
const hackathonTeam = require('../controllers/hackathonTeam.controller');
const security = require('../middlewares/security/auth.security')

router.post('/create-team', security.verifyUser, hackathonTeamValidator.createTeamValidator, hackathonTeam.createTeam);
// router.post('/add-user-in-team', hackathonTeamValidator.addUserTeamValidator, hackathonTeam.addUserInTeam)
router.post('/invite-to-team', security.verifyUser, hackathonTeamValidator.inviteUserTeamValidator, hackathonTeam.inviteUserInTeam)
router.get('/get-invites', security.verifyUser, hackathonTeam.getUserInvites)
router.patch('/accept-invites', security.verifyUser, hackathonTeam.acceptHackathonInvite)


module.exports = router;
