const express = require("express");
const getUsers = require("../controllers/userController.js");
const authenticateUid = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/info", authenticateUid, getUsers);

module.exports = router;
