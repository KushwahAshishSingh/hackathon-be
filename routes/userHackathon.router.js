const express = require('express');
const router = express.Router();
const userHackathonController = require('../controllers/userHackathon.controller')
const userHackathonValidator = require('../middlewares/validators/userHackathon.validator')
const security = require('../middlewares/security/auth.security')

router.post('/submit', security.verifyUser, userHackathonValidator.submitHackathon, userHackathonController.submitHackathon);

module.exports = router;
