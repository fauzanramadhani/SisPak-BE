const express = require("express");
const { registerUser, authWithGoogle } = require("../controllers/authController");

const router = express.Router();

router.post("/registerUser", registerUser);

router.post("/authWithGoogle", authWithGoogle);

module.exports = router;
