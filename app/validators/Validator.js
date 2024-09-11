const { body, validationResult } = require('express-validator');
const Admin = require('../models').Admin;

const signupValidationRules = () => {
  return [
    body('name').notEmpty().withMessage('Name is required'),
    body('email')
      .isEmail().withMessage('Invalid email address')
      .custom(async (value, { req }) => {
        // Check if email already exists in the database
        const admin = await Admin.findOne({ where: { email: value } });
        if (admin) {
          return Promise.reject('Email already exist');
        }
      }),
    body('password')
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ];
};

const loginValidationRules = () => {
  return [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required')
  ];
};

const getCategory = () => {
  console.log("e");
  
  // return [
  //   param('bus_cat_id')
  //   .notEmpty().withMessage('ID is required')
  //   .isInt({ gt: 0 }).withMessage('ID must be a positive integer'),  
  //   console.log("2"),
  // ];
  return [
    body('name').notEmpty().withMessage('Name is required'),
    body('email')
      .isEmail().withMessage('Invalid email address')
      .custom(async (value, { req }) => {
        // Check if email already exists in the database
        const admin = await Admin.findOne({ where: { email: value } });
        if (admin) {
          return Promise.reject('Email already exist');
        }
      }),
    body('password')
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  signupValidationRules,
  loginValidationRules,
  validate,
  getCategory
};
