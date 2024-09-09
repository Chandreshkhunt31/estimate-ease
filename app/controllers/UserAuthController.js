const User = require('../models').User;
const Merchant = require('../models').Merchant;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const saltRounds = 10;

const signup = async (req, res) => {
  try {
    const body = req.body

    const checkMerchant = await Merchant.findByPk(body.merchant_id);
    if (!checkMerchant) return res.status(404).send({ status: false, message: "This Merchant does not exist. Please check Merchant ID." });

    const hashedPassword = await bcrypt.hash(body.password, saltRounds);
    body.password = hashedPassword

    const user = await User.create(body);
    return res.status(201).send({ status: true, message: "User created successfully.", data: user });

  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
    return res.status(200).send({ status: true, message: "User created successfully.", data: token, });

  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: error });
  }
};

module.exports = {
  signup,
  login,
};
