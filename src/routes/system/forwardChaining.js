const express = require("express");
const authenticateUid = require("../../middlewares/authMiddleware");
const { addSymptoms, addDisease, synchronize} = require("../../controllers/system/forwardChainingController");

const router = express.Router();

router.post("/add_symptoms", authenticateUid, addSymptoms);
router.post("/add_disease", authenticateUid, addDisease);
router.post("/synchronize", authenticateUid, synchronize);

module.exports = router;
