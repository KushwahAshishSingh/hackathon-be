const express = require('express');
const router = express.Router();

const healthCheckRouter = require('./healthCheck.router');
const authRouter = require('./auth.router')
const userHackathon = require('./userHackathon.router')

router.use('/health-check', healthCheckRouter);
router.use('/auth', authRouter)
router.use('/user-hackathon', userHackathon)

module.exports = router;
