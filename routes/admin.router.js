const express = require('express');
const router = express.Router();
const createHackathon = require('../controllers/admin/createHackathon')
const updateHackathon = require('../controllers/admin/updateHackathon')
const deleteHackathon = require('../controllers/admin/deleteHackathon')
const fetchHackathon = require('../controllers/admin/getHackathons')
const listHackathonTeams = require('../controllers/admin/fetchTeamsSubmission')
const authValidators = require('../middlewares/validators/auth.validator')
const security = require('../middlewares/security/auth.security')
const hackathonValidator = require('../middlewares/validators/hackathon.validator')

router.post('/', createHackathon);
router.patch('/', updateHackathon);
router.delete('/', deleteHackathon);
router.get('/', fetchHackathon);

router.post('/', security.verifyUser, security.isAdminCheck, hackathonValidator.createTeamValidator, security.verifyUser, security.isAdminCheck, createHackathon);
router.patch('/', security.verifyUser, security.isAdminCheck, updateHackathon);
router.delete('/', security.verifyUser, security.isAdminCheck, deleteHackathon);
router.get('/fetch-teams', security.verifyUser, security.isAdminCheck, listHackathonTeams)
router.get('/', security.verifyUser, security.isAdminCheck, fetchHackathon);

module.exports = router;
