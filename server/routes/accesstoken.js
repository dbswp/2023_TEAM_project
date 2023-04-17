// const express = require("express");
// const { accesstoken } = require("../controller/userController");

// const router = express.Router();

// router.get("/login", accesstoken);

// module.exports = router;

const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const ACCESS_SECRET = "my-access-secret";

router.get("/verify", (req, res) => {
  try {
    const token = req.cookies.accessToken;
    const data = jwt.verify(token, ACCESS_SECRET);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
