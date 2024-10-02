const Customer = require('../models').Customer;
const QuotationDetail = require('../models').QuotationDetail;
const QuotationItem = require('../models').QuotationItem;
const QuotationMaterial = require('../models').QuotationMaterial;
const MerchantSubProduct = require('../models').MerchantSubProduct;
const SubProductUnit = require('../models').SubProductUnit;
const Unit = require('../models').Unit;
 

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

const createEstimate = async (body) => {
    try {
        let { name, address, contact_no, quote_by, created_by, quote_number, quotationItems, merchant_id } = body

        console.log(body, "body");
        

        const customerData = { name, address, contact_no, merchant_id }
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

        const quotationDetailData = { quote_number, quote_by, created_by, customer_id, merchant_id }
        const newQuotationDetail = await addQuotationDetail(quotationDetailData);
        if (!newQuotationDetail.status) {
            return ({
                status: false,
                message: newQuotationDetail.message,
                data: {}
            });
        }

        console.log(quotationItems, "quotationItems");
        

        quotationItems.map(async (item) => {
            const quotationItemData = {
                quote_id: newQuotationDetail.data.id,
                name: item.item_name,
                item_name: item.name,
                product_id: item.product_id
            }
            console.log(item, "item");
            
            console.log(quotationItemData, "quotationItemData");
            

            const newQuotationItem = await addQuotationItem(quotationItemData);
            if (!newQuotationItem.status) {
                return ({
                    status: false,
                    message: newQuotationItem.message,
                    data: {}
                });
            }
            let materialData = item.material
            materialData.map(async (item) => {

                let quotationMaterialData = {
                    material_id: item.material_id,
                    unit_of_measure: item.unit_of_measure,
                    qty: item.qty,
                    price: item.price,
                    quote_item_id: newQuotationItem.data.id
                }
                item.id ? (quotationMaterialData.id = item.id) : ''

                const newQuotationMaterial = await addQuotationMaterial(quotationMaterialData);
                if (!newQuotationMaterial.status) {
                    return ({
                        status: false,
                        message: newQuotationMaterial.message,
                        data: {}
                    });
                }

            })
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
        let { name, address, contact_no, merchant_id } = customerData;

        // const existingCustomer = await Customer.findOne({ where: { contact_no } });
        // if (existingCustomer != null) {
        //     const updateData = { name, address }
        //     const [affectedRows] = await Customer.update(updateData, { where: { id: existingCustomer.id } });

        //     if (affectedRows === 0) {
        //         return ({
        //             status: false,
        //             message: "No changes were made to the Customer data. Please check the provided information.",
        //             data: {}
        //         });
        //     }
        //     const customer = await Customer.findOne({ where: { contact_no } });
        //     return ({
        //         status: true,
        //         message: "Customer updated successfully.",
        //         data: customer
        //     });
        // }

        const newCustomer = await Customer.create({ name, address, contact_no, merchant_id });
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
        const { quote_number, quote_by, created_by, customer_id, merchant_id } = quotationDetailData;

        // const existingQuotationDetail = await QuotationDetail.findOne({ where: { quote_number } });
        // if (existingQuotationDetail != null) {

        //     const updateData = { quote_by, created_by, customer_id }
        //     const [affectedRows] = await QuotationDetail.update(updateData, { where: { id: existingQuotationDetail.id } });
        //     if (affectedRows === 0) {
        //         return ({
        //             status: false,
        //             message: "No changes were made to the QuotationDetail data. Please check the provided information.",
        //             data: {}
        //         });
        //     }
        //     const quotationDetail = await QuotationDetail.findOne({ where: { quote_number } });

        //     return ({
        //         status: true,
        //         message: "Customer updated successfully.",
        //         data: quotationDetail
        //     });
        // }

        const newQuotationDetail = await QuotationDetail.create({ quote_number, quote_by, created_by, customer_id, merchant_id });
        if (!newQuotationDetail) {
            return ({
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
        const { quote_id, item_name,name, product_id } = quotationItemData;

        // const name = item_name
        // const existingQuotationItem = await QuotationItem.findOne({ where: { name } });
        // if (existingQuotationItem != null) {

        //     const updateData = { quote_id, name, product_id }
        //     const [affectedRows] = await QuotationItem.update(updateData, { where: { id: existingQuotationItem.id } });
        //     if (affectedRows === 0) {
        //         return ({
        //             status: false,
        //             message: "No changes were made to the QuotationItem data. Please check the provided information.",
        //             data: {}
        //         });
        //     }
        //     const quotationItem = await QuotationItem.findOne({ where: { name } });

        //     return ({
        //         status: true,
        //         message: "QuotationItem updated successfully.",
        //         data: quotationItem
        //     });
        // }

        const newQuotationItem = await QuotationItem.create({ quote_id, name, item_name, product_id });
        if (!newQuotationItem) {
            return ({
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

const addQuotationMaterial = async (quotationMaterialData) => {
    try {
        const { material_id, unit_of_measure, qty, price, quote_item_id, id } = quotationMaterialData;

        if (id != null) {
            const existingQuotationMaterial = await QuotationMaterial.findOne({ where: { id } });
            if (existingQuotationMaterial != null) {

                const updateData = { material_id, unit_of_measure, qty, price }
                const [affectedRows] = await QuotationMaterial.update(updateData, { where: { id: existingQuotationMaterial.id } });
                if (affectedRows === 0) {
                    return ({
                        status: false,
                        message: "No changes were made to the QuotationMaterial data. Please check the provided information.",
                        data: {}
                    });
                }
                const quotationMaterial = await QuotationMaterial.findOne({ where: { material_id } });

                return ({
                    status: true,
                    message: "QuotationMaterial updated successfully.",
                    data: quotationMaterial
                });
            }
        }

        const newQuotationMaterial = await QuotationMaterial.create({ material_id, unit_of_measure, qty, price, quote_item_id });
        if (!newQuotationMaterial) {
            return ({
                status: false,
                message: "Something went wrong while inserting QuotationMaterial data.",
                data: {}
            });
        }

        return ({
            status: true,
            message: "QuotationMaterial added successfully.",
            data: newQuotationMaterial
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

const getEstimate = async (data) => {
    try {
        const { user_customer_id } = data;

        const customerData = await getCustomer({ user_customer_id });

        if (!customerData || customerData.length === 0) {
            return {
                status: false,
                message: "No customers found",
                data: {}
            };
        }

        const quotationDetailsData = await getQuotationDetails({ customer_id: user_customer_id });

        if (!quotationDetailsData || quotationDetailsData.length === 0) {
            throw new Error("No quotation details found for customer");
        }

        const quotationDetails = await Promise.all(quotationDetailsData.data.map(async (quotationDetail) => {
            const quotationItemData = await getQuotationItem({ quote_id: quotationDetail.id });

            if (!quotationItemData || quotationItemData.length === 0) {
                throw new Error("No quotation items found for quotation detail");
            }

            const quotationItems = await Promise.all(quotationItemData.data.map(async (quotationItem) => {
                const quotationMaterialData = await getQuotationMaterial({ quote_item_id: quotationItem.id });

                if (!quotationMaterialData || quotationMaterialData.length === 0) {
                    throw new Error("No quotation materials found for quotation item");
                }

                const subProductData = await Promise.all(quotationMaterialData.data.map(async (subProduct) => {
                    const amount = subProduct.price * subProduct.qty
 
                    const sub_product_id = subProduct.material_id

                    const queryCondition = sub_product_id ? { where: { sub_product_id } } : {};
                    const units = await SubProductUnit.findAll({
                        ...queryCondition, include: [{
                            model: Unit,
                            as: 'units',
                        }]
                    }); 
                    const data = {
                        id: subProduct.id,
                        name: subProduct.merchant_sub_products.name,
                        price: subProduct.price,
                        quantity: subProduct.qty,
                        SubProductUnits: units,
                        amount: amount,
                    }
                    return data

                }));

                const data = {
                    id: quotationItem.id,
                    name: quotationItem.item_name,
                    total: subProductData.reduce((sum, item) => sum + item.amount, 0),
                    item_name: quotationItem.name,
                    product_id: quotationItem.product_id,
                    subProduct: subProductData
                }

                return data
            }));

            return {
                quotationDetail: quotationDetail,
                quotationItem: quotationItems
            };
        }));
 

        const finalData = {
            customer: customerData.data,
            quotation: quotationDetails[0]
        }
        return {
            status: true,
            message: "Customer data retrieved successfully.",
            data: finalData
        };


    } catch (error) {
        console.error(error);
        return ({
            status: false,
            message: "An error occurred. Please try again.",
            error: error.message
        });
    }
};
const getEstimateCustomerList = async (data) => {
    try {
        const { merchant_id } = data;


        const customerData = await getCustomer({ merchant_id });

        if (!customerData || customerData.length === 0) {
            return {
                status: false,
                message: "No customers found",
                data: {}
            };
        }

        return {
            status: true,
            message: "Customer data retrieved successfully.",
            data: customerData.data
        };


    } catch (error) {
        console.error(error);
        return ({
            status: false,
            message: "An error occurred. Please try again.",
            error: error.message
        });
    }
};

const getCustomer = async (data) => {
    try {
        const { merchant_id, user_customer_id } = data;

        let customerData = []

        if (user_customer_id != null) {
            customerData = await Customer.findOne({ where: { id: user_customer_id } });
        }
        else {
            customerData = await Customer.findAll({ where: { merchant_id } });
        }

        if (!customerData || customerData.length === 0) {
            return {
                status: false,
                message: "No customer data found for the provided merchant ID.",
                data: {}
            };
        }

        return {
            status: true,
            message: "Customer data retrieved successfully.",
            data: customerData
        };
    } catch (error) {
        console.error(error);
        return ({
            status: false,
            message: "An error occurred. Please try again.",
            error: error.message
        });
    }
};

const getQuotationDetails = async (data) => {
    try {
        const { customer_id } = data;


        const quotationData = await QuotationDetail.findAll({ where: { customer_id } });

        if (!quotationData || quotationData.length === 0) {
            return {
                status: false,
                message: "No quotation data found for the provided quotation ID.",
                data: {}
            };
        }

        return {
            status: true,
            message: "Quotation data retrieved successfully.",
            data: quotationData
        };
    } catch (error) {
        console.error(error);
        return ({
            status: false,
            message: "An error occurred. Please try again.",
            error: error.message
        });
    }
};
const getQuotationItem = async (data) => {
    try {
        const { quote_id } = data;
        console.log(quote_id);
        

        const quotationItemData = await QuotationItem.findAll({ where: { quote_id } });

        if (!quotationItemData || quotationItemData.length === 0) {
            return {
                status: false,
                message: "No quotation item data found for the provided quote ID.",
                data: {}
            };
        }
        console.log(quotationItemData);
        

        return {
            status: true,
            message: "Quotation Item data retrieved successfully.",
            data: quotationItemData
        };
    } catch (error) {
        console.error(error);
        return ({
            status: false,
            message: "An error occurred. Please try again.",
            error: error.message
        });
    }
};
const getQuotationMaterial = async (data) => {
    try {
        const { quote_item_id } = data;

        // const quotationMaterialData = await QuotationMaterial.findAll({ where: { quote_item_id } });
        const queryCondition = { where: { quote_item_id } }
        const quotationMaterialData = await QuotationMaterial.findAll({
            ...queryCondition, include: [{
                model: MerchantSubProduct,
                as: 'merchant_sub_products',
            },
            ]
        });

        if (!quotationMaterialData || quotationMaterialData.length === 0) {
            return {
                status: false,
                message: "No quotation item data found for the provided quote ID.",
                data: {}
            };
        }

        return {
            status: true,
            message: "Quotation Material data retrieved successfully.",
            data: quotationMaterialData
        };
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
    createEstimate,
    getEstimate,
    getEstimateCustomerList
}
