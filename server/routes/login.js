const express = require('express');
const { loginUser } = require('../controller/userController');

const router = express.Router();

router.post('/', loginUser);

module.exports = router;
