const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller')
const authValidators = require('../middlewares/validators/auth.validator')

router.post('/signup', authValidators.signupValidator, authController.signup);


module.exports = router;
