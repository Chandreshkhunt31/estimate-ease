const Customer = require('../models').Customer;
const QuotationDetail = require('../models').QuotationDetail;
const QuotationItem = require('../models').QuotationItem;
const QuotationMaterial = require('../models').QuotationMaterial;
const MerchantSubProduct = require('../models').MerchantSubProduct;
const SubProductUnit = require('../models').SubProductUnit;
const Unit = require('../models').Unit;
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const os = require('os');

 
const createEstimate = async (body) => {
    try {
        let { name, address, contact_no, quote_by, created_by, quote_number, quotationItems, merchant_id, sales_rep } = body
 
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

        const existingQuotationNumber = await QuotationDetail.findOne({
            where: { merchant_id },
            order: [['quote_number', 'DESC']],
            paranoid: false
        });
        
        
        quote_number = existingQuotationNumber ? parseInt(existingQuotationNumber.quote_number) + 1 : 1
        // console.log(existingQuotationNumber.quote_number);
        console.log(quote_number);

        const quotationDetailData = { quote_number, quote_by, created_by, customer_id, merchant_id, sales_rep }
        const newQuotationDetail = await addQuotationDetail(quotationDetailData);
        if (!newQuotationDetail.status) {
            return ({
                status: false,
                message: newQuotationDetail.message,
                data: {}
            });
        }

        quotationItems.map(async (item) => {
            if (item.total != 0) {
                const quotationItemData = {
                    quote_id: newQuotationDetail.data.id,
                    name: item.item_name,
                    item_name: item.name,
                    product_id: item.product_id
                }

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
        let { name, address, contact_no, merchant_id } = customerData;

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
const updateCustomer = async ({ customerData, user_customer_id }) => {
    try {
        let { name, address, contact_no } = customerData;

        const updateData = { name, address }
        const [affectedRows] = await Customer.update(updateData, { where: { id: user_customer_id } });

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
        const { quote_number, quote_by, created_by, customer_id, merchant_id, sales_rep } = quotationDetailData;
     
        const newQuotationDetail = await QuotationDetail.create({ quote_number, quote_by, created_by, customer_id, merchant_id, sales_rep });
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
const updateQuotationDetail = async (quotationDetailData) => {
    try {
        const { quote_number, quote_by, created_by, customer_id, sales_rep } = quotationDetailData;

        const existingQuotationDetail = await QuotationDetail.findOne({ where: { quote_number } });
        if (existingQuotationDetail != null) {

            const updateData = { quote_by, created_by, customer_id, sales_rep }
            const [affectedRows] = await QuotationDetail.update(updateData, { where: { id: existingQuotationDetail.id } });
            if (affectedRows === 0) {
                return ({
                    status: false,
                    message: "No changes were made to the QuotationDetail data. Please check the provided information.",
                    data: {}
                });
            }
            const quotationDetail = await QuotationDetail.findOne({ where: { quote_number } });

            return ({
                status: true,
                message: "Customer updated successfully.",
                data: quotationDetail
            });
        }


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
        const { quote_id, item_name, name, product_id } = quotationItemData;

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

const updateQuotationItem = async (quotationItemData) => {
    try {
        const { quote_id, item_name, name, product_id, id } = quotationItemData;


        if (id != null) {

            const updateData = { quote_id, item_name, name, product_id }
            const [affectedRows] = await QuotationItem.update(updateData, { where: { id: id } });
            if (affectedRows === 0) {
                return ({
                    status: false,
                    message: "No changes were made to the QuotationItem data. Please check the provided information.",
                    data: {}
                });
            }
            const quotationItem = await QuotationItem.findOne({ where: { id: id } });

            return ({
                status: true,
                message: "QuotationItem updated successfully.",
                data: quotationItem
            });
        }
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
            return {
                status: false,
                message: "No quotation details found for customer",
                data: {}
            };  
        }

        const quotationDetails = await Promise.all(quotationDetailsData.data.map(async (quotationDetail) => {
            const quotationItemData = await getQuotationItem({ quote_id: quotationDetail.id });
 
            if (!quotationItemData || quotationItemData.data.length === 0) { 
                return {
                    quotationDetail: quotationDetail,
                }; 
            }
           
            

            const quotationItems = await Promise.all(quotationItemData.data.map(async (quotationItem) => {
                const quotationMaterialData = await getQuotationMaterial({ quote_item_id: quotationItem.id });

                if (!quotationMaterialData || quotationMaterialData.length === 0) {
                    return {
                        status: false,
                        message: "No quotation materials found for quotation item",
                        data: {}
                    };  
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
                        merchant_product_id: subProduct.merchant_sub_products.merchant_product_id,
                        price: subProduct.price,
                        quantity: subProduct.qty,
                        SubProductUnits: units,
                        material_id: subProduct.material_id,
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
     
        if (!customerData.status || customerData.length === 0) {
             
            
            return {
                status: false,
                message: "No customers found",
                data: {}
            };
        }
        const results = await Promise.all(
            customerData?.data.map(async (element) => {
                const data = await getQuotationDetails({ customer_id: element.id }); 
                element.dataValues.quote_number = data?.data[0] ? data?.data[0].quote_number : 0;
                element.dataValues.sales_rep = data?.data[0] ? data?.data[0].sales_rep : 0;
                return element;
            })
        );

        return { 
            status: true,
            message: "Customer data retrieved successfully.",
            data: results
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

        const quotationItemData = await QuotationItem.findAll({ where: { quote_id } });

        if (!quotationItemData || quotationItemData.length === 0) {
            return {
                status: false,
                message: "No quotation item data found for the provided quote ID.",
                data: []
            };
        }

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

const updateEstimate = async ({ body, user_customer_id }) => {
    try {
        let { name, address, quote_by, created_by, contact_no, quote_number, quotationItems, merchant_id, sales_rep } = body

        const customerData = { name, address, contact_no }
        const newCustomer = await updateCustomer({ customerData, user_customer_id })

        if (!newCustomer.status) {
            return ({
                status: false,
                message: newCustomer.message,
                data: {}
            });
        }

        const customer_id = user_customer_id

        const quotationDetailData = { quote_number, quote_by, created_by, customer_id, merchant_id, sales_rep }

        const newQuotationDetail = await updateQuotationDetail(quotationDetailData);
        if (!newQuotationDetail.status) {
            return ({
                status: false,
                message: newQuotationDetail.message,
                data: {}
            });
        }

        quotationItems.map(async (item) => {

            if (item.total != 0) {

                const quotationItemData = {
                    quote_id: newQuotationDetail.data.id,
                    name: item.item_name,
                    item_name: item.name,
                    id: item.id,
                    product_id: item.product_id
                }

                const newQuotationItem = await updateQuotationItem(quotationItemData);
             
                
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
            } else {
                await QuotationMaterial.destroy({ where: { quote_item_id: item.id } })
                await QuotationItem.destroy({ where: { id: item.id } })
            }
        })

        const finalData = newQuotationDetail.data

        return ({
            status: true,
            message: "Estimate updated successfully.",
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
const generatePdf = async (body) => {
    
         
        const { name, address, contact_no, quote_by, salesContact, quote_number, sales_rep, date, quotationItems } = body
        try {

            let html = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');
    
            html = html.replace('{{name}}', name || '')
                .replace('{{address}}', address || '')
                .replace('{{contact_no}}', contact_no || '')
                .replace('{{quote_by}}', quote_by || '')
                .replace('{{salesContact}}', salesContact || '')
                .replace('{{sales_rep}}', sales_rep || '')
                .replace('{{date}}', date || '')
                .replace('{{quote_number}}', quote_number || '');
    
    
            let itemsHtml = '';
    
            let lastTotal = 0
            if (Array.isArray(quotationItems)) {
                quotationItems.forEach(item => {
    
    
                    let materialsHtml = '';
                    let finalTotal = 0;
    
                    if (Array.isArray(item.material)) {
                        item.material.forEach((material, index) => {
                            let total = material.price * material.qty;
                            finalTotal += total;
    
                            materialsHtml += `
                                <tr>
                                    ${index === 0 ? `<td rowSpan=${item.material.length} class=''>
                                        <label>${item.item_name || 'N/A'}</label>
                                        </br>
                                        <label>${item.name || ''}</label>
                                    </td>` : ''}
    
                                    <td>${material.name || ''}</td>
                                    <td>${material.unit_of_measure || ''}</td>
                                    <td>${material.qty || ''}</td>
                                    <td>${material.price || ''}</td>
                                    <td>${total || ''}</td>
    
                                    ${index === 0 ? `<td rowSpan=${item.material.length} class='align-content-center'>
                                        <div class='d-flex'>
                                            ${item.total}
                                        </div>
                                    </td>` : ''}
                                </tr>
                            `;
                        });
                    }
                    lastTotal += finalTotal
    
                    itemsHtml += `
                                ${materialsHtml}
                                            
                    `;
                });
            } else {
                itemsHtml = '<p>No items available.</p>';
            }
    
            itemsHtml += `
                                <tr>
                                    <td colspan="6" class="text-right"><strong>Final Total:</strong></td>
                                    <td>${lastTotal.toFixed(2)}</td>
                                </tr>
                        `;
    
    
            html = html.replace('{{#quotationItems}}', itemsHtml);
    
    
    
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
    
            await page.setContent(html, { waitUntil: 'domcontentloaded' });
    
            const homeDir = os.homedir();
            const downloadFolder = path.join(homeDir, 'Downloads');
    
            if (!fs.existsSync(downloadFolder)) {
                console.error('Downloads folder not found!');
                return;
            }
    
            const pdfPath = path.join(downloadFolder, `${name}.pdf`);
    
            await page.pdf({
                path: pdfPath,
                format: 'A4',
                printBackground: true,
            });
    
            await browser.close();
    
            
            return ({
                status: true,
                message: "Pdf generated successfully.",
                data: {}
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
    createEstimate,
    getEstimate,
    getEstimateCustomerList,
    updateEstimate,
    generatePdf
}
