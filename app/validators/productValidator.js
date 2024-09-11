const { body } = require('express-validator');

const productValidation = () => {
  return [
    body('name')
      .optional()
      .notEmpty().withMessage('Name cannot be empty'),

    body('business_category_id')
      .optional()
      .isInt().withMessage('Business Category ID must be an integer'),
  ];
};


module.exports = {
  productValidation 
};
