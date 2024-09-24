const QuotationDetail = require('../models').QuotationDetail;
const User = require('../models').User;
const Customer = require('../models').Customer;

const addQuotationDetail = async (req, res) => {
    try {
        const { quot_number, quot_by, date, created_by, customer_id } = req.body;

        const existingQuotationDetail = await QuotationDetail.findOne({ where: { quot_number, quot_by, customer_id } });
        if (existingQuotationDetail) {
            return res.status(409).json({
                status: false,
                message: "This QuotationDetail already exists. Please try another one.",
                data: {}
            });
        }

        const newQuotationDetail = await QuotationDetail.create({ quot_number, quot_by, date, created_by, customer_id });
        if (!newQuotationDetail) {
            return res.status(400).json({
                status: false,
                message: "Something went wrong while inserting QuotationDetail data.",
                data: {}
            });
        }

        return res.status(201).json({
            status: true,
            message: "QuotationDetail added successfully.",
            data: newQuotationDetail
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

const getQuotationDetail = async (req, res) => {
    try {
        const { quotation_detail_id } = req.query; 

        const quotationDetail = await QuotationDetail.findByPk(quotation_detail_id, {
            include: [{
                model: User,
                as: 'users',
                attributes: ['id', 'name', "email", "phone_number"],
            },
            {
                model: Customer,
                as: 'customers',
                attributes: ['id', 'name', "address", "contact_no"],
            }]
        });

        if (!quotationDetail) {
            return res.status(404).json({
                status: false,
                message: "QuotationDetail not found.",
                data: {}
            });
        }

        return res.status(200).json({
            status: true,
            message: "QuotationDetail retrieved successfully.",
            data: quotationDetail
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
 
const getQuotationDetailList = async (req, res) => {
    try {
        const quotationDetails = await QuotationDetail.findAll( {
            include: [{
                model: User,
                as: 'users',
                attributes: ['id', 'name', "email", "phone_number"],
            },
            {
                model: Customer,
                as: 'customers',
                attributes: ['id', 'name', "address", "contact_no"],
            }]
        });

        if (quotationDetails.length === 0) {
            return res.status(404).json({
                status: false,
                message: "No quotationDetails found.",
                data: []
            });
        }

        return res.status(200).json({
            status: true,
            message: "QuotationDetail list retrieved successfully.",
            data: quotationDetails
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

const updateQuotationDetail = async (req, res) => {
    try {
        const { quotation_detail_id } = req.query;
        const body = req.body;

        const existingQuotationDetail = await QuotationDetail.findByPk(quotation_detail_id);
        if (!existingQuotationDetail) {
            return res.status(404).json({
                status: false,
                message: "This QuotationDetail does not exist. Please check QuotationDetail ID.",
                data: {}
            });
        }

        const [affectedRows] = await QuotationDetail.update(body, { where: { id: quotation_detail_id } });
        if (affectedRows === 0) {
            return res.status(400).json({
                status: false,
                message: "No changes were made to the QuotationDetail data. Please check the provided information.",
                data: {}
            });
        }

        return res.status(200).json({
            status: true,
            message: "QuotationDetail updated successfully.",
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
    addQuotationDetail,
    getQuotationDetail,
    getQuotationDetailList,
    updateQuotationDetail
}
 