const Estimate = require("../services/estimateService")
const QuotationItem = require('../models').QuotationItem;
const QuotationMaterial = require('../models').QuotationMaterial;

const addEstimate = async (req, res) => {
    try {
        let body = req.body 
        
        const user_id = req.id
 
        body.created_by = user_id
 
        const newEstimate = await Estimate.createEstimate(body) 
        if (!newEstimate.status) {
            return res.status(400).json({
                status: false,
                message: newEstimate.message,
                data: {}
            });
        }

        return res.status(201).json({
            status: true,
            message: "Estimate added successfully.",
            data: newEstimate.data
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

const editEstimate = async (req, res) => {
    try {
        let body = req.body   
         
        const { user_customer_id } = req.query
 
        const user_id = req.id
 
        body.created_by = user_id
 
        const newEstimate = await Estimate.updateEstimate({ body, user_customer_id }) 
        if (!newEstimate.status) {
            return res.status(400).json({
                status: false,
                message: newEstimate.message,
                data: {}
            });
        } 

        return res.status(201).json({
            status: true,
            message: "Estimate added successfully.",
            data: newEstimate.data
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

const deleteQuotationItem = async (req, res) => {
    try { 
        const { quotation_item_id  } = req.query

        await QuotationMaterial.destroy({ where: { quote_item_id: quotation_item_id } })
  
        const newQuotationItem = await QuotationItem.destroy({ where: { id: quotation_item_id } }) 
        if (!newQuotationItem.status) {
            return res.status(400).json({
                status: false,
                message: newQuotationItem.message,
                data: {}
            });
        } 

        return res.status(201).json({
            status: true,
            message: "QuotationItem added successfully.",
            data: newQuotationItem.data
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

const getEstimate = async (req, res) => {
    try {
        let { user_customer_id } = req.query   
        

        const estimateData = await Estimate.getEstimate({user_customer_id}) 
        if (!estimateData.status) {
            return res.status(400).json({
                status: false,
                message: estimateData.message,
                data: {}
            });
        }

        return res.status(201).json({
            status: true,
            message: "Estimate added successfully.",
            data:  estimateData.data 
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

const getEstimateCustomerList = async (req, res) => {
    try {
        let { merchant_id } = req.query  

        const estimateData = await Estimate.getEstimateCustomerList({merchant_id}) 
        if (!estimateData.status) {
            return res.status(400).json({
                status: false,
                message: estimateData.message,
                data: {}
            });
        }

        return res.status(201).json({
            status: true,
            message: "Estimate added successfully.",
            data:  estimateData.data 
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




module.exports ={
    addEstimate,
    getEstimate,
    getEstimateCustomerList,
    editEstimate,
    deleteQuotationItem
}