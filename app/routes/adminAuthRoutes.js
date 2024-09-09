const express = require('express');
const router = express.Router();
const adminAuthController = require('../controllers/AdminAuthController');
const { signupValidationRules, loginValidationRules, validate } = require('../validators/Validator');
const { authenticateAdminJWT } = require('../middlewares/authenticateJWT')

router.post('/signup', signupValidationRules(), validate, adminAuthController.signup);

router.post('/login', loginValidationRules(), validate, adminAuthController.login);

const businessCategoryController = require('../controllers/BusinessCategoryController')
router.post('/business-category/add', authenticateAdminJWT, businessCategoryController.addBusinessCategory);
router.get("/business-category/list", authenticateAdminJWT, businessCategoryController.getBusinessCategoryList);
router.get("/business-category/get", authenticateAdminJWT, businessCategoryController.getBusinessCategory);

const merchantController = require('../controllers/MerchantController')
router.post('/merchant/add', authenticateAdminJWT, merchantController.addMerchant);
router.put("/merchant/edit", authenticateAdminJWT, merchantController.updateMerchant);
router.get("/merchant/list", authenticateAdminJWT, merchantController.getMerchantList);
router.get("/merchant/get", authenticateAdminJWT, merchantController.getMerchant);
router.delete("/merchant/delete", authenticateAdminJWT, merchantController.deleteMerchant);

const productController = require('../controllers/ProductController')
router.post('/product/add', authenticateAdminJWT, productController.addProduct);
router.put("/product/edit", authenticateAdminJWT, productController.updateProduct);
router.get("/product/list", authenticateAdminJWT, productController.getProductList);
router.get("/product/get", authenticateAdminJWT, productController.getProduct);
router.delete("/product/delete", authenticateAdminJWT, productController.deleteProduct);

const merchantProductController = require('../controllers/MerchantProductController')

router.post('/merchant-product/add', authenticateAdminJWT, merchantProductController.addMerchantProduct);
router.put("/merchant-product/edit", authenticateAdminJWT, merchantProductController.updateMerchantProduct);
router.get("/merchant-product/list", authenticateAdminJWT, merchantProductController.getMerchantProductList);
router.get("/merchant-product/get", authenticateAdminJWT, merchantProductController.getMerchantProduct);
router.delete("/merchant-product/delete", authenticateAdminJWT, merchantProductController.deleteMerchantProduct);

const unitController = require('../controllers/UnitController')

router.post('/unit/add', authenticateAdminJWT, unitController.addUnit);
router.put("/unit/edit", authenticateAdminJWT, unitController.updateUnit);
router.get("/unit/list", authenticateAdminJWT, unitController.getUnitList);
router.get("/unit/get", authenticateAdminJWT, unitController.getUnit);
router.delete("/unit/delete", authenticateAdminJWT, unitController.deleteUnit);

const merchantSubProductController = require('../controllers/MerchantSubProductController')

router.post('/merchant-sub-product/add', authenticateAdminJWT, merchantSubProductController.addMerchantSubProduct);
router.put("/merchant-sub-product/edit", authenticateAdminJWT, merchantSubProductController.updateMerchantSubProduct);
router.get("/merchant-sub-product/list", authenticateAdminJWT, merchantSubProductController.getMerchantSubProductList);
router.get("/merchant-sub-product/get", authenticateAdminJWT, merchantSubProductController.getMerchantSubProduct);
router.delete("/merchant-sub-product/delete", authenticateAdminJWT, merchantSubProductController.deleteMerchantSubProduct);



module.exports = router;
