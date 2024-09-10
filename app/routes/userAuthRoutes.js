const express = require('express');
const router = express.Router();
const { userSignupValidationRules, loginValidationRules, validate } = require('../validators/Validator');
const { authenticateUserJWT } = require('../middlewares/authenticateUserJWT')

const userAuthController = require('../controllers/UserAuthController');
router.post('/signup', userSignupValidationRules(), validate, userAuthController.signup);
router.post('/login', loginValidationRules(), validate, userAuthController.login);

const productController = require('../controllers/ProductController')
 
router.get("/product/list", authenticateUserJWT, productController.getProductList);
router.get("/product/get", authenticateUserJWT, productController.getProduct); 

const merchantSubProductController = require('../controllers/MerchantSubProductController')

router.post('/merchant-sub-product/add', authenticateUserJWT, merchantSubProductController.addMerchantSubProduct);
router.put("/merchant-sub-product/edit", authenticateUserJWT, merchantSubProductController.updateMerchantSubProduct);
router.get("/merchant-sub-product/list", authenticateUserJWT, merchantSubProductController.getMerchantSubProductList);
router.get("/merchant-sub-product/get", authenticateUserJWT, merchantSubProductController.getMerchantSubProduct);
router.delete("/merchant-sub-product/delete", authenticateUserJWT, merchantSubProductController.deleteMerchantSubProduct);

module.exports = router;
 