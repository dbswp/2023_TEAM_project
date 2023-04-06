const express = require("express");
const { refreshtoken } = require("../controller/userController");

const router = express.Router();

router.post("/login", refreshtoken);

module.exports = router;
