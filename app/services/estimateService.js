const Customer = require('../models').Customer;
const QuotationDetail = require('../models').QuotationDetail;
const QuotationItem = require('../models').QuotationItem;

 
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

const createEstimate = async (body) => {
    try { 
        let { name, address, contact_no, quote_by, created_by, quote_number, quotationItems } = body

        const customerData = { name, address, contact_no }
        const newCustomer = await addCustomer(customerData) 
        
        if (!newCustomer.status) {
            return ({
                status: false,
                message: newCustomer.message,
                data: {}
            });
        }

        const customer_id = newCustomer.data.id 
        
        quote_number = quote_number ? quote_number : getRandomNumber(1, 1000); 
    
        const quotationDetailData = { quote_number, quote_by, created_by, customer_id }
        const newQuotationDetail = await addQuotationDetail(quotationDetailData);
        if (!newQuotationDetail.status) {
            return ({
                status: false,
                message: newQuotationDetail.message,
                data: {}
            });
        }

        quotationItems.map(async (item) => { 
            const quotationItemData = { 
                quote_id : newQuotationDetail.data.id, 
                item_name : item.item_name, 
                product_id : item.product_id
            }  
            
            const newQuotationItem = await addQuotationItem(quotationItemData);
            if (!newQuotationItem.status) {
                return ({
                    status: false,
                    message: newQuotationItem.message,
                    data: {}
                });
            }
            
        })
 
        const finalData = newQuotationDetail.data
         
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

const addQuotationDetail = async (quotationDetailData) => {
    try {
        const { quote_number, quote_by,   created_by, customer_id } = quotationDetailData;

        const existingQuotationDetail = await QuotationDetail.findOne({ where: { quote_number } });
        if (existingQuotationDetail != null) {

            const updateData = { quote_by,  created_by, customer_id }
            const [affectedRows] = await QuotationDetail.update(updateData, { where: { id: existingQuotationDetail.id } });
            if (affectedRows === 0) {
                return  ({
                    status: false,
                    message: "No changes were made to the QuotationDetail data. Please check the provided information.",
                    data: {}
                });
            }
            const quotationDetail = await QuotationDetail.findOne({ where: { quote_number } });

            return  ({
                status: true,
                message: "Customer updated successfully.",
                data: quotationDetail
            });
        }

        const newQuotationDetail = await QuotationDetail.create({ quote_number, quote_by,  created_by, customer_id });
        if (!newQuotationDetail) {
            return  ({
                status: false,
                message: "Something went wrong while inserting QuotationDetail data.",
                data: {}
            });
        }

        return ({
            status: true,
            message: "QuotationDetail added successfully.",
            data: newQuotationDetail
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

const addQuotationItem = async (quotationItemData) => {
    try {
        const { quote_id, item_name, product_id } = quotationItemData;  
        
        const name = item_name
        const existingQuotationItem = await QuotationItem.findOne({ where: { name } });
        if (existingQuotationItem != null) {

            const updateData = { quote_id, name, product_id }
            const [affectedRows] = await QuotationItem.update(updateData, { where: { id: existingQuotationItem.id } });
            if (affectedRows === 0) {
                return  ({
                    status: false,
                    message: "No changes were made to the QuotationItem data. Please check the provided information.",
                    data: {}
                });
            }
            const quotationItem = await QuotationItem.findOne({ where: { name } });

            return  ({
                status: true,
                message: "QuotationItem updated successfully.",
                data: quotationItem
            });
        }

        const newQuotationItem = await QuotationItem.create({ quote_id, name, product_id });
        if (!newQuotationItem) {
            return  ({
                status: false,
                message: "Something went wrong while inserting QuotationItem data.",
                data: {}
            });
        }

        return ({
            status: true,
            message: "QuotationItem added successfully.",
            data: newQuotationItem
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
 

module.exports = { 
    createEstimate
}
