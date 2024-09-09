const Product = require('../models').Product;

// insert Product
const addProduct = async (req, res) => {
    try {
        const body = req.body;

        const isExist = await Product.findOne({ where: { name: body.name, business_category_id: body.business_category_id } });
        if (isExist) return res.status(404).send({ status: false, message: "This Product is already exist. Please try another one." });

        const addProductData = await Product.create(body);
        if (!addProductData) return res.status(400).send({ status: false, message: "Something went wrong. while insert Product data.!!", data: {} });

        return res.status(201).send({ status: true, message: "Product added successfully.", data: addProductData, });
    } catch (Err) {
        console.log(Err);
        return res.status(400).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    }
}

// update Product
const updateProduct = async (req, res) => {
    try {
        const body = req.body;
        const { product_id } = req.query;

        const checkProduct = await Product.findByPk(product_id);
        if (!checkProduct) return res.status(404).send({ status: false, message: "This Product does not exist. Please check Product ID." });

        const [affectedRows] = await Product.update(body, { where: { id: product_id } });
        if (affectedRows === 0) return res.status(400).send({ status: false, message: "No changes were made to the Product data. Please check the provided information.", data: {} });

        return res.status(200).send({ status: true, message: "Product updated successfully.", data: {} });
    } catch (Err) {
        console.error(Err);
        return res.status(500).send({ status: false, message: "Something went wrong. Please try again.", data: [], });
    }
};

// get  Product List
const getProductList = async (req, res) => {
    try {
        const { business_category_id } = req.query;

        const queryCondition = business_category_id ? { where: { business_category_id } } : {};

        const getProductList = await Product.findAll(queryCondition);
        if (getProductList.length === 0) return res.status(404).send({ status: false, message: "No products found for the given category.", data: [] });

        return res.status(200).send({ status: true, message: "Product list retrieved successfully.", data: getProductList });
    } catch (Err) {
        console.error(Err);
        return res.status(500).send({ status: false, message: "Something went wrong. Please try again.", data: [], error: Err });
    }
};


// get  Product by product_id
const getProduct = async (req, res) => {
    try {
        const { product_id } = req.query

        const getProductData = await Product.findByPk(product_id);
        if (!getProductData) return res.status(400).send({ status: false, message: "Product data not found", data: {} });

        return res.status(200).send({ status: true, message: "Product get successfully", data: getProductData, });
    } catch (Err) {
        console.log(Err);
        return res.status(400).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { product_id } = req.query;

        const checkProduct = await Product.destroy({ where: { id: product_id } });
        if (!checkProduct) return res.status(404).send({ status: false, message: "This Product does not exist. Please check Product ID." });

        return res.status(200).send({ status: true, message: `Product deleted successfully.`, data: {} });
    } catch (Err) {
        console.error(Err);
        return res.status(500).send({ status: false, message: "Something went wrong. Please try again.", data: [], error: Err });
    }
};


module.exports = {
    addProduct,
    getProductList,
    getProduct,
    deleteProduct,
    updateProduct
}