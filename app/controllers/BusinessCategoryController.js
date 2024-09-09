const BusinessCategory = require('../models').BusinessCategory;

// insert Business Category
const addBusinessCategory = async (req, res) => {
    try {
        const body = req.body;

        const isExist = await BusinessCategory.findOne({ where: { name: body.name } });
        if (isExist) return res.status(404).send({ status: false, message: "This category is already exist. Please try another one." });

        const addBusinessCategoryData = await BusinessCategory.create(body);
        if (!addBusinessCategoryData) return res.status(400).send({ status: false, message: "Something wrong while create a business category!!", data: {} });

        return res.status(201).send({ status: true, message: "Business category added successfully.", data: addBusinessCategoryData, });
    } catch (Err) {
        console.log(Err);
        return res.status(400).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    }
}

// get Business Category List
const getBusinessCategoryList = async (req, res) => {
    try {
        const getBusinessCategoryList = await BusinessCategory.findAll();
        if (!getBusinessCategoryList) return res.status(400).send({ status: false, message: "Business category data not found", data: {} });

        return res.status(200).send({ status: true, message: "Business category list get successfully", data: getBusinessCategoryList, });

    } catch (Err) {
        console.log(Err);
        return res.status(400).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    }
}

// get Business Category by bus_cat_id
const getBusinessCategory = async (req, res) => {
    try {
        const { bus_cat_id } = req.query

        const getBusinessCategoryData = await BusinessCategory.findByPk(bus_cat_id);
        if (!getBusinessCategoryData) return res.status(400).send({ status: false, message: "Business category data not found", data: {} });

        return res.status(200).send({ status: true, message: "Business category get successfully", data: getBusinessCategoryData, });
    } catch (Err) {
        console.log(Err);
        return res.status(400).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    }
}

module.exports = {
    addBusinessCategory,
    getBusinessCategoryList,
    getBusinessCategory
}