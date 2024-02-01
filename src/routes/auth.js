const express = require("express");
const router = express.Router();

const {
    register,
} = require("../controllers/authController.js");

router.post("/registration", register);

module.exports = router;