const express = require("express");
const router = express.Router();
const { User } = require("../models/user");

const { getArticles, writeArticle } = require("../controller/boardController");

const isLogin = async (req, res, next) => {
  if (req.signedCookies.user) {
    const user = await User.findOne({ email: req.signedCookies.user });
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).send("Unauthorized");
    }
  } else {
    res.status(401).send("Unauthorized");
  }
};

router.get("/", isLogin, getArticles);
router.post("/write", isLogin, writeArticle);

module.exports = router;
