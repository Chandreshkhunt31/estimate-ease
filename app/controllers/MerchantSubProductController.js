const MerchantSubProduct = require('../models').MerchantSubProduct;

// insert Merchant Sub Product
const addMerchantSubProduct = async (req, res) => {
    try {
        const body = req.body;
        const checkData = { merchant_id: body.merchant_id, product_id: body.product_id, is_active: true }
 
        const isExist = await MerchantSubProduct.findOne({ where: checkData });
        if (isExist) return res.status(404).send({ status: false, message: "This Merchant Sub Product is already exist. Please try another one." });

        const addMerchantSubProductData = await MerchantSubProduct.create(body);
        if (!addMerchantSubProductData) return res.status(400).send({ status: false, message: "Something went wrong. while insert Merchant Sub Product data.!!", data: {} });

        return res.status(201).send({ status: true, message: "Merchant Sub Product added successfully.", data: addMerchantSubProductData, });
    } catch (Err) {
        console.log(Err);
        return res.status(400).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    }
}

// update Merchant Sub Product
const updateMerchantSubProduct = async (req, res) => {
    try {
        const body = req.body;
        const { merchant_sub_product_id } = req.query;

        const checkMerchantSubProduct = await MerchantSubProduct.findByPk(merchant_sub_product_id);
        if (!checkMerchantSubProduct) return res.status(404).send({ status: false, message: "This Merchant Sub Product does not exist. Please check Merchant Sub Product ID." });

        const [affectedRows] = await MerchantSubProduct.update(body, { where: { id: merchant_sub_product_id } });
        if (affectedRows === 0) return res.status(400).send({ status: false, message: "No changes were made to the Merchant Sub Product data. Please check the provided information.", data: {} });

        return res.status(200).send({ status: true, message: "Merchant Sub Product updated successfully.", data: {} });
    } catch (Err) {
        console.error(Err);
        return res.status(500).send({ status: false, message: "Something went wrong. Please try again.", data: [], });
    }
};

// get  Merchant Sub Product List
const getMerchantSubProductList = async (req, res) => {
    try {
        const { merchant_id } = req.query;

        const queryCondition = merchant_id ? { where: { merchant_id } } : {};

        const getMerchantSubProductList = await MerchantSubProduct.findAll(queryCondition);
        if (getMerchantSubProductList.length === 0) return res.status(404).send({ status: false, message: "No Merchant Sub Products found for the given category.", data: [] });

        return res.status(200).send({ status: true, message: "Merchant Sub Product list retrieved successfully.", data: getMerchantSubProductList });
    } catch (Err) {
        console.error(Err);
        return res.status(500).send({ status: false, message: "Something went wrong. Please try again.", data: [], error: Err });
    }
};


// get  MerchantSubProduct by merchant_sub_product_id
const getMerchantSubProduct = async (req, res) => {
    try {
        const { merchant_sub_product_id } = req.query

        const getMerchantSubProductData = await MerchantSubProduct.findByPk(merchant_sub_product_id);
        if (!getMerchantSubProductData) return res.status(400).send({ status: false, message: "Merchant Sub Product data not found", data: {} });

        return res.status(200).send({ status: true, message: "Merchant Sub Product get successfully", data: getMerchantSubProductData, });
    } catch (Err) {
        console.log(Err);
        return res.status(400).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    }
}

const deleteMerchantSubProduct = async (req, res) => {
    try {
        const { merchant_sub_product_id } = req.query;

        const checkMerchantSubProduct = await MerchantSubProduct.destroy({ where: { id: merchant_sub_product_id } });
        if (!checkMerchantSubProduct) return res.status(404).send({ status: false, message: "This Merchant Sub Product does not exist. Please check Merchant Sub Product ID." });

        return res.status(200).send({ status: true, message: `Merchant Sub Product deleted successfully.`, data: {} });
    } catch (Err) {
        console.error(Err);
        return res.status(500).send({ status: false, message: "Something went wrong. Please try again.", data: [], error: Err });
    }
};


module.exports = {
    addMerchantSubProduct,
    getMerchantSubProductList,
    getMerchantSubProduct,
    deleteMerchantSubProduct,
    updateMerchantSubProduct
}