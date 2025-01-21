const express = require("express");
const {getUser,  deleteUser} = require("../controllers/userController.js");
const authenticateUid = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/info", authenticateUid, getUser);
router.post("/delete", authenticateUid, deleteUser);

module.exports = router;
