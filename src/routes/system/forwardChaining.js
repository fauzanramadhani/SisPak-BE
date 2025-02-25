const express = require("express");
const authenticateUid = require("../../middlewares/authMiddleware");
const { updateSymptoms, getSymptoms, updateDiseases, synchronize, getDiseases, getSymptomWithDisease} = require("../../controllers/system/forwardChainingController");

const router = express.Router();

router.post("/update_symptoms", authenticateUid, updateSymptoms);
router.get("/symptoms", authenticateUid, getSymptoms);
router.post("/update_diseases", authenticateUid, updateDiseases);
router.get("/diseases", authenticateUid, getDiseases);
router.post("/synchronize", authenticateUid, synchronize);
router.get("/symptom_with_disease", authenticateUid, getSymptomWithDisease);

module.exports = router;
