const express = require('express');
const router = express.Router();

const adminAuthRoutes = require('./adminAuthRoutes');

router.use('/admin', adminAuthRoutes);

module.exports = router;
