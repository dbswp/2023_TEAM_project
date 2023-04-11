const express = require('express');
const { logout, kakaoLogoutUser } = require('../controller/userController');

const router = express.Router();

// router.post("/kakaologin", logout);
router.get('/', logout);
router.get('/kakaologout', kakaoLogoutUser);

module.exports = router;

// router.get('/logout', async (req, res) => {
//   req.session.destroy((err) => {
//     if (err) throw err;
//     res.clearCookie('user');
//     res.redirect('/login');
//   });
// });
