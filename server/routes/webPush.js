const express = require('express');
const { simpleNotification } = require('../config/naverApiTest');

const router = express.Router();

router.get('/', simpleNotification);

module.exports = router;
