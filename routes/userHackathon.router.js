const express = require('express');
const router = express.Router();
const userHackathonController = require('../controllers/userHackathon.controller')
const userHackathonValidator = require('../middlewares/validators/userHackathon.validator')

router.post('/submit', security.verifyUser, userHackathonValidator.submitHackathon, userHackathonController.submitHackathon);

module.exports = router;
