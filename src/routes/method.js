const express = require("express");
const {method, methodStepByMethodId} = require("../controllers/methodController.js");
const authenticateUid = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authenticateUid, method);
router.get("/step", authenticateUid, methodStepByMethodId);

module.exports = router;
