const express = require('express');
const router = express.Router();
const adminAuthController = require('../controllers/AdminAuthController');
const { signupValidationRules, loginValidationRules, validate } = require('../validators/adminValidator');
const authenticateAdminJWT = require('../middlewares/authenticateAdminJWT')

router.post('/signup', signupValidationRules(), validate, adminAuthController.signup);

router.post('/login', loginValidationRules(), validate, adminAuthController.login);

module.exports = router;
