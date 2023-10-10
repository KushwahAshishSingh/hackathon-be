const express = require('express');
const { basicHealthCheck } = require('../controllers/healthCheck.controller');
const router = express.Router();

router.get('/basic', basicHealthCheck);


module.exports = router;
