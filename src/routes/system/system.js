const express = require("express");
const authenticateUid = require("../../middlewares/authMiddleware");
const {getAllSystem, createSystem, getSystemById} = require("../../controllers/system/system");

const router = express.Router();

router.get("/", authenticateUid, getAllSystem);
router.get("/get_system_by_id", authenticateUid, getSystemById);
router.post("/create_system", authenticateUid, createSystem);


module.exports = router;