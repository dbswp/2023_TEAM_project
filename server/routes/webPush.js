const express = require('express');
const { findPhoneNumber } = require('../controller/userController');

const router = express.Router();

router.get('/', findPhoneNumber);

module.exports = router;
