const express = require("express");
const authenticateUid = require("../../middlewares/authMiddleware");
const {getAllSystem} = require("../../controllers/system/system");

const router = express.Router();

router.get("/", authenticateUid, getAllSystem);

module.exports = router;