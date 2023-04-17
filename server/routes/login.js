const express = require("express");
const {
  loginUser,
  kakaoLoginUser,
  // isLoggedIn,
  checkLoggedIn,
} = require("../controller/userController");

const router = express.Router();

router.post("/kakaologin", kakaoLoginUser);
router.post("/", loginUser);

module.exports = router;
