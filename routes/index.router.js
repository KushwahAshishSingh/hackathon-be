const express = require('express');
const router = express.Router();

const healthCheckRouter = require('./healthCheck.router');
const authRouter = require('./auth.router')

router.use('/health-check',healthCheckRouter);
router.use('/auth', authRouter)

module.exports = router;
