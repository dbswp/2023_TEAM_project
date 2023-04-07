const express = require('express');
const { datarefreshing, sendData } = require('../controller/dataController');

const router = express.Router();

router.get('/', datarefreshing);
router.get('/getdata', sendData);

module.exports = router;
