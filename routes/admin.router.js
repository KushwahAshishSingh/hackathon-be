const express = require('express');
const router = express.Router();
const createHackathon = require('../controllers/admin/createHackathon')
const updateHackathon = require('../controllers/admin/updateHackathon')
const deleteHackathon = require('../controllers/admin/deleteHackathon')
const fetchHackathon = require('../controllers/admin/getHackathons')
const authValidators = require('../middlewares/validators/auth.validator')
const security = require('../middlewares/security/auth.security')

router.post('/', createHackathon);
router.patch('/', updateHackathon);
router.delete('/', deleteHackathon);
router.get('/', fetchHackathon);


module.exports = router;
