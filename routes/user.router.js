const express = require('express');
const router = express.Router();
const fetchHackathon = require('../controllers/fetchHackathonUserSide.controller');
const fetchHackathonDetails = require('../controllers/fetchHackathonDetails.controller');
const fetchResult = require('../controllers/fetchResults.controller');
const authValidators = require('../middlewares/validators/auth.validator')
const security = require('../middlewares/security/auth.security')

router.get('/hackathon-details',fetchHackathonDetails)
router.get('/fetch-result',fetchResult)
router.get('/', fetchHackathon);


module.exports = router;
