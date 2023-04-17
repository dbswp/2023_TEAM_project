const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { ACCESS_SECRET, REFRESH_SECRET } = process.env;
const { getArticles, writeArticle } = require("../controller/boardController");
const { checkLoggedIn } = require("../controller/userController");

router.get("/get", checkLoggedIn, getArticles);
router.post("/write", checkLoggedIn, writeArticle);

module.exports = router;
