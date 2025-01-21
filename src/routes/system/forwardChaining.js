const express = require("express");
const authenticateUid = require("../../middlewares/authMiddleware");
const {createSystem, addSymptoms, addDisease, getSystemById} = require("../../controllers/system/forwardChaining");

const router = express.Router();

router.post("/create_system", authenticateUid, createSystem);
router.post("/add_symptoms", authenticateUid, addSymptoms);
router.post("/add_disease", authenticateUid, addDisease);
router.get("/get_system_by_id", authenticateUid, getSystemById);

module.exports = router;
