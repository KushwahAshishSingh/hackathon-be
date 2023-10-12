const express = require('express');
const router = express.Router();
const fetchHackathon = require('../controllers/fetchHackathonUserSide.controller')
const authValidators = require('../middlewares/validators/auth.validator')
const security = require('../middlewares/security/auth.security')

router.get('/', fetchHackathon);


module.exports = router;
