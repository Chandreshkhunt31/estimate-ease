const Merchant = require('../models').Merchant;

const addMerchant = async (req, res) => {
    try {
        const { name, business_category_id, address, city, state } = req.body;

        if (!name || !business_category_id || !address || !city || !state) {
            return res.status(400).json({
                status: false,
                message: "All fields (name, business_category_id, address, city, state) are required."
            });
        }

        const isExist = await Merchant.findOne({ where: { name } });
        if (isExist) {
            return res.status(409).json({
                status: false,
                message: "This Merchant already exists. Please try another one."
            });
        }

        const data = { name, business_category_id, address, city, state };

        const newMerchant = await Merchant.create(data);
        if (!newMerchant) {
            return res.status(500).json({
                status: false,
                message: "Something went wrong while inserting Merchant data.",
                data: {}
            });
        }

        return res.status(201).json({
            status: true,
            message: "Merchant added successfully.",
            data: newMerchant
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


const updateMerchant = async (req, res) => {
    try {
        const { merchant_id } = req.query;
        const body = req.body;

        if (!merchant_id) {
            return res.status(400).json({
                status: false,
                message: "Merchant ID is required."
            });
        }

        const checkMerchant = await Merchant.findByPk(merchant_id);
        if (!checkMerchant) {
            return res.status(404).json({
                status: false,
                message: "This Merchant does not exist. Please check the Merchant ID."
            });
        }

        const [affectedRows] = await Merchant.update(body, { where: { id: merchant_id } });

        if (affectedRows === 0) {
            return res.status(400).json({
                status: false,
                message: "No changes were made to the Merchant data. Please check the provided information.",
                data: {}
            });
        }

        return res.status(200).json({
            status: true,
            message: "Merchant updated successfully.",
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


const getMerchantList = async (req, res) => {
    try {
        const merchantList = await Merchant.findAll();

        if (!merchantList || merchantList.length === 0) {
            return res.status(404).json({
                status: false,
                message: "No merchants found.",
                data: []
            });
        }

        return res.status(200).json({
            status: true,
            message: "Merchant list retrieved successfully.",
            data: merchantList
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

const getMerchant = async (req, res) => {
    try {
        const { merchant_id } = req.query;

        if (!merchant_id) {
            return res.status(400).json({
                status: false,
                message: "Merchant ID is required."
            });
        }

        const merchantData = await Merchant.findByPk(merchant_id);

        if (!merchantData) {
            return res.status(404).json({
                status: false,
                message: "Merchant not found.",
                data: {}
            });
        }

        return res.status(200).json({
            status: true,
            message: "Merchant retrieved successfully.",
            data: merchantData
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

const deleteMerchant = async (req, res) => {
    try {
        const { merchant_id } = req.query;

        if (!merchant_id) {
            return res.status(400).json({
                status: false,
                message: "Merchant ID is required."
            });
        }

        const deletedRows = await Merchant.destroy({ where: { id: merchant_id } });

        if (deletedRows === 0) {
            return res.status(404).json({
                status: false,
                message: "This Merchant does not exist. Please check the Merchant ID."
            });
        }

        return res.status(200).json({
            status: true,
            message: "Merchant deleted successfully.",
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
    addMerchant,
    getMerchantList,
    getMerchant,
    deleteMerchant,
    updateMerchant
}