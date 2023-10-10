const express = require('express');
const router = express.Router();

const healthCheckRouter = require('./healthCheck.router');
const authRouter = require('./auth.router')
const hackathonTeamRouter = require('./hackathonTeam.router')

router.use('/health-check', healthCheckRouter);
router.use('/auth', authRouter)
router.use('/team', hackathonTeamRouter)
module.exports = router;
