const Estimate = require("../services/estimateService")

const addEstimate = async (req, res) => {
    try {
        let body = req.body 
        console.log(body);
        
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
const getEstimate = async (req, res) => {
    try {
        let { merchant_id } = req.query  

        const estimateData = await Estimate.getEstimate({merchant_id}) 
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
    getEstimate
}