const express = require("express");
const { accesstoken } = require("../controller/userController");

const router = express.Router();

router.post("/login", accesstoken);

module.exports = router;
