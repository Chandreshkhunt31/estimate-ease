const Customer = require('../models').Customer;


const addCustomer = async (req, res) => {
    try {
        const { name, address, contact_no } = req.body;

        const existingCustomer = await Customer.findOne({ where: { name, address, contact_no } });
        if (existingCustomer) {
            return res.status(409).json({
                status: false,
                message: "This Customer already exists. Please try another one.",
                data: {}
            });
        }

        const newCustomer = await Customer.create({ name, address, contact_no });
        if (!newCustomer) {
            return res.status(400).json({
                status: false,
                message: "Something went wrong while inserting Customer data.",
                data: {}
            });
        }

        return res.status(201).json({
            status: true,
            message: "Customer added successfully.",
            data: newCustomer
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
    addCustomer,
    
}
 