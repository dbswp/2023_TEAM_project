const express = require('express');
const { loginUser, kakaoLoginUser } = require('../controller/userController');

const router = express.Router();

router.post('/kakaologin', kakaoLoginUser);
router.post('/', loginUser);

module.exports = router;
