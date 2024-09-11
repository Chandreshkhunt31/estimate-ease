const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const User = require('../models').User;

const authenticateUserJWT = (req, res, next) => {

  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, JWT_SECRET, async (err, user) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Something went wrong in Authentication.Please try again.",
          isAuth: false,
          data: []
        });
      }

      req.id = user.id;
      req.email = user.email;

      const user = await User.findOne({ where: { id: user.id, email: user.email, } });

      if (user) {
        return next();
      }

      return res.status(401).json({
        success: false,
        message: "Unauthorized access. User not found",
        isAuth: false,
        data: []
      });

    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access. Token is missing.",
      isAuth: false,
      data: []
    });
  }
};

module.exports = { authenticateUserJWT };
