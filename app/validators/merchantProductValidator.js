const { body } = require('express-validator'); 

const merchantProductValidation = () => {
  return [
    body('merchant_id')
      .optional()
      .isInt().withMessage('Merchant ID must be an integer'),

    body('product_id')
      .optional()
      .isInt().withMessage('Product ID must be an integer'),
  ];
};
 

module.exports = {
  merchantProductValidation 
};
