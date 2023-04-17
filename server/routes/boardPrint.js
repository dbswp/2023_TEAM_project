const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { ACCESS_SECRET } = process.env;

const { getArticles, writeArticle } = require("../controller/boardController");

// const checkToken = (req, res, next) => {
//   const token = req.cookies.accessToken;
//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }
//   try {
//     const decoded = jwt.verify(token, ACCESS_SECRET);
//     req.email = decoded.email;
//     next();
//   } catch (err) {
//     return res.status(403).json({ message: "Invalid token" });
//   }
// };

router.get("/", getArticles);
router.post("/write", writeArticle);

module.exports = router;
