const express = require('express');
const router = express.Router();
const adminAuthController = require('../controllers/adminAuthController');
const { signupValidationRules, loginValidationRules, validate } = require('../validators/validator');
const { authenticateAdminJWT } = require('../middlewares/authenticateAdminJWT')

router.post('/signup', signupValidationRules(), validate, adminAuthController.signup);

router.post('/login', loginValidationRules(), validate, adminAuthController.login);

const businessCategoryController = require('../controllers/businessCategoryController')
router.post('/business-category/add', authenticateAdminJWT, businessCategoryController.addBusinessCategory);
router.get("/business-category/list", authenticateAdminJWT, businessCategoryController.getBusinessCategoryList);
router.get("/business-category/get", authenticateAdminJWT, businessCategoryController.getBusinessCategory);

const merchantController = require('../controllers/merchantController')
router.post('/merchant/add', authenticateAdminJWT, merchantController.addMerchant);
router.put("/merchant/edit", authenticateAdminJWT, merchantController.updateMerchant);
router.get("/merchant/list", authenticateAdminJWT, merchantController.getMerchantList);
router.get("/merchant/get", authenticateAdminJWT, merchantController.getMerchant);
router.delete("/merchant/delete", authenticateAdminJWT, merchantController.deleteMerchant);

const productController = require('../controllers/productController')
router.post('/product/add', authenticateAdminJWT, productController.addProduct);
router.put("/product/edit", authenticateAdminJWT, productController.updateProduct);
router.get("/product/list", authenticateAdminJWT, productController.getProductList);
router.get("/product/get", authenticateAdminJWT, productController.getProduct);
router.delete("/product/delete", authenticateAdminJWT, productController.deleteProduct);

const merchantProductController = require('../controllers/merchantProductController')

router.post('/merchant-product/add', authenticateAdminJWT, merchantProductController.addMerchantProduct);
router.put("/merchant-product/edit", authenticateAdminJWT, merchantProductController.updateMerchantProduct);
router.get("/merchant-product/list", authenticateAdminJWT, merchantProductController.getMerchantProductList);
router.get("/merchant-product/get", authenticateAdminJWT, merchantProductController.getMerchantProduct);
router.delete("/merchant-product/delete", authenticateAdminJWT, merchantProductController.deleteMerchantProduct);

const unitController = require('../controllers/unitController')

router.post('/unit/add', authenticateAdminJWT, unitController.addUnit);
router.put("/unit/edit", authenticateAdminJWT, unitController.updateUnit);
router.get("/unit/list", authenticateAdminJWT, unitController.getUnitList);
router.get("/unit/get", authenticateAdminJWT, unitController.getUnit);
router.delete("/unit/delete", authenticateAdminJWT, unitController.deleteUnit);

const merchantSubProductController = require('../controllers/merchantSubProductController')

router.post('/merchant-sub-product/add', authenticateAdminJWT, merchantSubProductController.addMerchantSubProduct);
router.put("/merchant-sub-product/edit", authenticateAdminJWT, merchantSubProductController.updateMerchantSubProduct);
router.get("/merchant-sub-product/list", authenticateAdminJWT, merchantSubProductController.getMerchantSubProductList);
router.get("/merchant-sub-product/get", authenticateAdminJWT, merchantSubProductController.getMerchantSubProduct);
router.delete("/merchant-sub-product/delete", authenticateAdminJWT, merchantSubProductController.deleteMerchantSubProduct);

const subProductUnitController = require('../controllers/subProductUnitController')

router.post('/sub-product-unit/add', authenticateAdminJWT, subProductUnitController.addSubProductUnit);
router.put("/sub-product-unit/edit", authenticateAdminJWT, subProductUnitController.updateSubProductUnit);
router.get("/sub-product-unit/list", authenticateAdminJWT, subProductUnitController.getSubProductUnitList);
router.get("/sub-product-unit/get", authenticateAdminJWT, subProductUnitController.getSubProductUnit);
router.delete("/sub-product-unit/delete", authenticateAdminJWT, subProductUnitController.deleteSubProductUnit);

module.exports = router;
