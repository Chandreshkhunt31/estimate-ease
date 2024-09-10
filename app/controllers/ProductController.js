const Product = require('../models').Product;

const addProduct = async (req, res) => {
    try {
        const { name, business_category_id } = req.body;

        if (!name || !business_category_id) {
            return res.status(400).json({
                status: false,
                message: "Product name and Business Category ID are required."
            });
        }

        const existingProduct = await Product.findOne({
            where: { name, business_category_id }
        });

        if (existingProduct) {
            return res.status(409).json({
                status: false,
                message: "This product already exists. Please try another one."
            });
        }

        const newProduct = await Product.create({ name, business_category_id });
        if (!newProduct) {
            return res.status(500).json({
                status: false,
                message: "Something went wrong while inserting product data.",
                data: {}
            });
        }

        return res.status(201).json({
            status: true,
            message: "Product added successfully.",
            data: newProduct
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "An error occurred. Please try again.",
            error: error.message
        });
    }
};


const updateProduct = async (req, res) => {
    try {
        const { product_id } = req.query;
        const updateData = req.body;

        if (!product_id) {
            return res.status(400).json({
                status: false,
                message: "Product ID is required."
            });
        }
        const product = await Product.findByPk(product_id);
        if (!product) {
            return res.status(404).json({
                status: false,
                message: "This Product does not exist. Please check the Product ID."
            });
        }

        const [affectedRows] = await Product.update(updateData, { where: { id: product_id } });

        if (affectedRows === 0) {
            return res.status(400).json({
                status: false,
                message: "No changes were made to the Product data. Please check the provided information.",
                data: {}
            });
        }

        return res.status(200).json({
            status: true,
            message: "Product updated successfully.",
            data: {}
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "An error occurred. Please try again.",
            error: error.message
        });
    }
};


const getProductList = async (req, res) => {
    try {
        const { business_category_id } = req.query;

        const queryCondition = business_category_id ? { where: { business_category_id } } : {};

        const products = await Product.findAll(queryCondition);

        if (products.length === 0) {
            return res.status(404).json({
                status: false,
                message: "No products found for the given category.",
                data: []
            });
        }

        return res.status(200).json({
            status: true,
            message: "Product list retrieved successfully.",
            data: products
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "An error occurred. Please try again.",
            error: error.message
        });
    }
};

const getProduct = async (req, res) => {
    try {
        const { product_id } = req.query;

        if (!product_id) {
            return res.status(400).json({
                status: false,
                message: "Product ID is required."
            });
        }

        const product = await Product.findByPk(product_id);
        if (!product) {
            return res.status(404).json({
                status: false,
                message: "Product not found.",
                data: {}
            });
        }

        return res.status(200).json({
            status: true,
            message: "Product retrieved successfully.",
            data: product
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "An error occurred. Please try again.",
            error: error.message
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { product_id } = req.query;

        if (!product_id) {
            return res.status(400).json({
                status: false,
                message: "Product ID is required."
            });
        }

        const deletedRows = await Product.destroy({ where: { id: product_id } });
        if (deletedRows === 0) {
            return res.status(404).json({
                status: false,
                message: "This Product does not exist. Please check the Product ID."
            });
        }

        return res.status(200).json({
            status: true,
            message: "Product deleted successfully.",
            data: {}
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "An error occurred. Please try again.",
            error: error.message
        });
    }
};


module.exports = {
    addProduct,
    getProductList,
    getProduct,
    deleteProduct,
    updateProduct
}