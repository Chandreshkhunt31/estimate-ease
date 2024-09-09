const Merchant = require('../models').Merchant;

// insert Merchant
const addMerchant = async (req, res) => {
    try {
        const body = req.body;

        const isExist = await Merchant.findOne({ where: { name: body.name } });
        if (isExist) return res.status(404).send({ status: false, message: "This Merchant is already exist. Please try another one." });

        const addMerchantData = await Merchant.create(body);
        if (!addMerchantData) return res.status(400).send({ status: false, message: "Something went wrong. while insert Merchant data.!!", data: {} });

        return res.status(201).send({ status: true, message: "Merchant added successfully.", data: addMerchantData, });
    } catch (Err) {
        console.log(Err);
        return res.status(400).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    }
}

// update Merchant
const updateMerchant = async (req, res) => {
    try {
        const body = req.body;
        const { merchant_id } = req.query;

        const checkMerchant = await Merchant.findByPk(merchant_id);
        if (!checkMerchant) return res.status(404).send({ status: false, message: "This Merchant does not exist. Please check Merchant ID." });

        const [affectedRows] = await Merchant.update(body, { where: { id: merchant_id } });
        if (affectedRows === 0) return res.status(400).send({ status: false, message: "No changes were made to the Merchant data. Please check the provided information.", data: {} });

        return res.status(200).send({ status: true, message: "Merchant updated successfully.", data: {} });
    } catch (Err) {
        console.error(Err);
        return res.status(500).send({ status: false, message: "Something went wrong. Please try again.", data: [], });
    }
};

// get  Merchant List
const getMerchantList = async (req, res) => {
    try {
        const getMerchantList = await Merchant.findAll();
        if (!getMerchantList) return res.status(400).send({ status: false, message: "Merchant data not found", data: {} });

        return res.status(200).send({ status: true, message: "Merchant list get successfully", data: getMerchantList, });

    } catch (Err) {
        console.log(Err);
        return res.status(400).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    }
}

// get  Merchant by merchant_id
const getMerchant = async (req, res) => {
    try {
        const { merchant_id } = req.query

        const getMerchantData = await Merchant.findByPk(merchant_id);
        if (!getMerchantData) return res.status(400).send({ status: false, message: "Merchant data not found", data: {} });

        return res.status(200).send({ status: true, message: "Merchant get successfully", data: getMerchantData, });
    } catch (Err) {
        console.log(Err);
        return res.status(400).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    }
}

const deleteMerchant = async (req, res) => {
    try {
        const { merchant_id } = req.query;

        const checkMerchant = await Merchant.destroy({ where: { id: merchant_id } });
        if (!checkMerchant) return res.status(404).send({ status: false, message: "This Merchant does not exist. Please check Merchant ID." });

        return res.status(200).send({ status: true, message: `Merchant deleted successfully.`, data: {} });
    } catch (Err) {
        console.error(Err);
        return res.status(500).send({ status: false, message: "Something went wrong. Please try again.", data: [], error: Err });
    }
};


module.exports = {
    addMerchant,
    getMerchantList,
    getMerchant,
    deleteMerchant,
    updateMerchant
}