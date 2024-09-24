const QuotationDetail = require('../models').QuotationDetail;

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
 
module.exports = {
    addQuotationDetail
}
 