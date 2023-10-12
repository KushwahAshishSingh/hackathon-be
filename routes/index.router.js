const express = require('express');
const router = express.Router();

const healthCheckRouter = require('./healthCheck.router');
const authRouter = require('./auth.router')
const hackathonTeamRouter = require('./hackathonTeam.router')
const adminRouter = require('./admin.router');
const userRouter = require('./user.router');

router.use('/health-check', healthCheckRouter);
router.use('/auth', authRouter)
router.use('/team', hackathonTeamRouter)
router.use('/admin', adminRouter)
router.use('/user', userRouter)
module.exports = router;
