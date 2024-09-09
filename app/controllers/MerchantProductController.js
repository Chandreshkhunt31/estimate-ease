const MerchantProduct = require('../models').MerchantProduct;

// insert Merchant Product
const addMerchantProduct = async (req, res) => {
    try {
        const body = req.body;
        const checkData = { merchant_id: body.merchant_id, product_id: body.product_id, is_active: true }
 
        const isExist = await MerchantProduct.findOne({ where: checkData });
        if (isExist) return res.status(404).send({ status: false, message: "This Merchant Product is already exist. Please try another one." });

        const addMerchantProductData = await MerchantProduct.create(body);
        if (!addMerchantProductData) return res.status(400).send({ status: false, message: "Something went wrong. while insert Merchant Product data.!!", data: {} });

        return res.status(201).send({ status: true, message: "Merchant Product added successfully.", data: addMerchantProductData, });
    } catch (Err) {
        console.log(Err);
        return res.status(400).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    }
}

// update Merchant Product
const updateMerchantProduct = async (req, res) => {
    try {
        const body = req.body;
        const { merchant_product_id } = req.query;

        const checkMerchantProduct = await MerchantProduct.findByPk(merchant_product_id);
        if (!checkMerchantProduct) return res.status(404).send({ status: false, message: "This Merchant Product does not exist. Please check Merchant Product ID." });

        const [affectedRows] = await MerchantProduct.update(body, { where: { id: merchant_product_id } });
        if (affectedRows === 0) return res.status(400).send({ status: false, message: "No changes were made to the Merchant Product data. Please check the provided information.", data: {} });

        return res.status(200).send({ status: true, message: "Merchant Product updated successfully.", data: {} });
    } catch (Err) {
        console.error(Err);
        return res.status(500).send({ status: false, message: "Something went wrong. Please try again.", data: [], });
    }
};

// get  Merchant Product List
const getMerchantProductList = async (req, res) => {
    try {
        const { merchant_id } = req.query;

        const queryCondition = merchant_id ? { where: { merchant_id } } : {};

        const getMerchantProductList = await MerchantProduct.findAll(queryCondition);
        if (getMerchantProductList.length === 0) return res.status(404).send({ status: false, message: "No merchant products found for the given category.", data: [] });

        return res.status(200).send({ status: true, message: "Merchant Product list retrieved successfully.", data: getMerchantProductList });
    } catch (Err) {
        console.error(Err);
        return res.status(500).send({ status: false, message: "Something went wrong. Please try again.", data: [], error: Err });
    }
};


// get  MerchantProduct by merchant_product_id
const getMerchantProduct = async (req, res) => {
    try {
        const { merchant_product_id } = req.query

        const getMerchantProductData = await MerchantProduct.findByPk(merchant_product_id);
        if (!getMerchantProductData) return res.status(400).send({ status: false, message: "Merchant Product data not found", data: {} });

        return res.status(200).send({ status: true, message: "Merchant Product get successfully", data: getMerchantProductData, });
    } catch (Err) {
        console.log(Err);
        return res.status(400).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    }
}

const deleteMerchantProduct = async (req, res) => {
    try {
        const { merchant_product_id } = req.query;

        const checkMerchantProduct = await MerchantProduct.destroy({ where: { id: merchant_product_id } });
        if (!checkMerchantProduct) return res.status(404).send({ status: false, message: "This Merchant Product does not exist. Please check Merchant Product ID." });

        return res.status(200).send({ status: true, message: `Merchant Product deleted successfully.`, data: {} });
    } catch (Err) {
        console.error(Err);
        return res.status(500).send({ status: false, message: "Something went wrong. Please try again.", data: [], error: Err });
    }
};


module.exports = {
    addMerchantProduct,
    getMerchantProductList,
    getMerchantProduct,
    deleteMerchantProduct,
    updateMerchantProduct
}