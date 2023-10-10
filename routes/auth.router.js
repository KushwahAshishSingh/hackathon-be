const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller')
const authValidators = require('../middlewares/validators/auth.validator')
const security = require('../middlewares/security/auth.security')
router.post('/signup', authValidators.signupValidator, authController.signup);
router.post('/signin',  authController.signIn);
router.patch('/change-privilege', security.verifyUser, security.isAdminCheck, authController.changePrivilege);



module.exports = router;
