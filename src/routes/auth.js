const express = require("express");
const { registerUser } = require("../controllers/authController");

const router = express.Router();

router.post("/basic", registerUser);

module.exports = router;
