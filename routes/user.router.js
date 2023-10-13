const express = require('express');
const router = express.Router();
const fetchHackathon = require('../controllers/fetchHackathonUserSide.controller');
const fetchHackathonDetails = require('../controllers/fetchHackathonDetails.controller');
const fetchResult = require('../controllers/fetchResults.controller');
const fetchByRounds = require('../controllers/fetchByRounds')
const authValidators = require('../middlewares/validators/auth.validator')
const security = require('../middlewares/security/auth.security')

router.get('/hackathon-details', security.verifyUser, fetchHackathonDetails)
router.get('/fetch-result', security.verifyUser, fetchResult)
router.get('/fetch-by-rounds', security.verifyUser, fetchByRounds)
router.get('/', security.verifyUser, fetchHackathon);


module.exports = router;
