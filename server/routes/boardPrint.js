const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { ACCESS_SECRET } = process.env;

const { getArticles, writeArticle } = require("../controller/boardController");

// custome middleware
// 토큰 값을 통해 유저를 찾아 auth를 합니다.
const jwtMiddleware = (req, res, next) => {
  // 클라이언트 쿠키에서 token을 가져옵니다.
  let token = req.cookies.x_auth;

  // token을 decode 합니다.
  jwt.verify(token, ACCESS_SECRET, (error, decoded) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "token을 decode하는 데 실패 했습니다." });
    }
    // decoded에는 jwt를 생성할 때 첫번째 인자로 전달한 객체가 있습니다.
    // { random: user._id } 형태로 줬으므로 _id를 꺼내 씁시다
    User.findOne({ email: decoded.email }, (error, user) => {
      if (error) {
        return res.json({ error: "DB에서 찾는 도중 오류가 발생했습니다" });
      }
      if (!user) {
        return res
          .status(404)
          .json({ isAuth: false, error: "token에 해당하는 유저가 없습니다" });
      }
      if (user) {
        // 🚨 다음에 사용할 수 있도록 req 객체에 token과 user를 넣어줍니다
        req.token = token;
        req.user = user;
      }
      next();
    });
  });
};

router.get("/", getArticles);
router.post("/write", jwtMiddleware, writeArticle);

module.exports = router;
