const Customer = require('../models').Customer;
 

const createEstimate = async (body) => {
    try { 
        let { name, address, contact_no } = body

        const customerData = { name, address, contact_no }
        const newCustomer = await addCustomer(customerData) 
        
        if (!newCustomer.status) {
            return ({
                status: false,
                message: newCustomer.message,
                data: {}
            });
        }
         
        const finalData = newCustomer.data
         
        return ({
            status: true,
            message: "Estimate added successfully.",
            data: finalData
        });
    } catch (error) {
        console.error(error);
        return ({
            status: false,
            message: "An error occurred. Please try again.",
            error: error.message
        });
    }
};

const addCustomer = async (customerData) => {
    try { 
        let { name, address, contact_no } = customerData;

        const existingCustomer = await Customer.findOne({ where: { contact_no } });
        if (existingCustomer != null) {
            const updateData = { name, address }
            const [affectedRows] = await Customer.update(updateData, { where: { id: existingCustomer.id } });
      
            if (affectedRows === 0) {
                return ({
                    status: false,
                    message: "No changes were made to the Customer data. Please check the provided information.",
                    data: {}
                });
            } 
            const customer = await Customer.findOne({ where: { contact_no } }); 
            return ({
                status: true,
                message: "Customer updated successfully.",
                data: customer
            });
        }

        const newCustomer = await Customer.create({ name, address, contact_no });
        if (!newCustomer) {
            return ({
                status: false,
                message: "Something went wrong while inserting Customer data.",
                data: {}
            });
        }

        return ({
            status: true,
            message: "Customer added successfully.",
            data: newCustomer
        });
    } catch (error) {
        console.error(error);
        return ({
            status: false,
            message: "An error occurred. Please try again.",
            error: error.message
        })
    }
};

module.exports = { 
    createEstimate
}
