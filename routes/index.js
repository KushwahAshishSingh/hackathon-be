const express = require('express');
const router = express.Router();

const healthCheckRouter = require('./healthCheck');

router.use('/healthcheck',healthCheckRouter);


module.exports = router;
