const express = require('express');
const router = express.Router();

const { userSignupValidationRules, loginValidationRules, validate } = require('../validators/userValidator');
const { customerValidation } = require('../validators/customerValidator');
const { authenticateUserJWT } = require('../middlewares/authenticateUserJWT')

const userAuthController = require('../controllers/userAuthController');
router.post('/signup', userSignupValidationRules(), validate, userAuthController.signup);
router.post('/login', loginValidationRules(), validate, userAuthController.login);

const productController = require('../controllers/productController')

router.get("/product/list", authenticateUserJWT, productController.getProductList);
router.get("/product/get", authenticateUserJWT, productController.getProduct);

const merchantSubProductController = require('../controllers/merchantSubProductController')

router.post('/merchant-sub-product/add', authenticateUserJWT, merchantSubProductController.addMerchantSubProduct);
router.put("/merchant-sub-product/edit", authenticateUserJWT, merchantSubProductController.updateMerchantSubProduct);
router.get("/merchant-sub-product/list", authenticateUserJWT, merchantSubProductController.getMerchantSubProductList);
router.get("/merchant-sub-product/get", authenticateUserJWT, merchantSubProductController.getMerchantSubProduct);
router.delete("/merchant-sub-product/delete", authenticateUserJWT, merchantSubProductController.deleteMerchantSubProduct);

const customerController = require('../controllers/customerController')

router.post('/customer/add',  customerValidation(), validate, authenticateUserJWT, customerController.addCustomer);
router.get("/customer/list", authenticateUserJWT, customerController.getCustomerList);
router.get("/customer/get", authenticateUserJWT, customerController.getCustomer);
router.delete("/customer/delete", authenticateUserJWT, customerController.deleteCustomer);
router.put("/customer/edit", authenticateUserJWT, customerController.updateCustomer);

const quotationDetailController = require('../controllers/quotationDetailController')

router.post('/quotation-detail/add', authenticateUserJWT, quotationDetailController.addQuotationDetail);


module.exports = router;
