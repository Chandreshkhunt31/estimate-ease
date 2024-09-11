const { body } = require('express-validator');

const merchantSubProductValidation = () => {
  return [
    body('merchant_id')
      .optional()
      .isInt().withMessage('Merchant ID must be an integer'),

    body('merchant_product_id')
      .optional()
      .isInt().withMessage('Merchant Product ID must be an integer'),

    body('name')
      .optional()
      .notEmpty().withMessage('Name cannot be empty'),
  ];
};


module.exports = {
  merchantSubProductValidation
};
