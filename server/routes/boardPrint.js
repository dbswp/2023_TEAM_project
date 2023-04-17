const express = require("express");
const router = express.Router();

const { getArticles, writeArticle } = require("../controller/boardController");
// const { isLoggedIn } = require("../controller/userController");

router.get("/", getArticles);
router.post("/write", writeArticle);

module.exports = router;
