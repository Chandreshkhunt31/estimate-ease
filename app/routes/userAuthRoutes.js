const express = require('express');
const router = express.Router();

const { userSignupValidationRules, loginValidationRules, validate } = require('../validators/userValidator');
const { customerValidation } = require('../validators/customerValidator');
const { authenticateUserJWT } = require('../middlewares/authenticateUserJWT')

const userAuthController = require('../controllers/userAuthController');
router.post('/signup', userSignupValidationRules(), validate, userAuthController.signup);
router.post('/login', loginValidationRules(), validate, userAuthController.login);

const userController = require('../controllers/userController')
 
router.get("/user/get", authenticateUserJWT, userController.getUser);


const merchantProductController = require('../controllers/merchantProductController')

router.get("/merchant-product/list", authenticateUserJWT, merchantProductController.getMerchantProductList); 

const merchantSubProductController = require('../controllers/MerchantSubProductController')

router.get("/merchant-sub-product/list", authenticateUserJWT, merchantSubProductController.getMerchantSubProductList); 

const estimateController = require('../controllers/estimationController')

router.post('/estimate/add', authenticateUserJWT, estimateController.addEstimate);

module.exports = router;
