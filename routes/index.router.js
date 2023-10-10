const express = require('express');
const router = express.Router();

const healthCheckRouter = require('./healthCheck.router');
const authRouter = require('./auth.router')
const adminRouter = require('./admin.router');

router.use('/health-check',healthCheckRouter);
router.use('/auth', authRouter)
router.use('/admin', adminRouter)
module.exports = router;
