const express = require("express");
const {saveProduct} = require("../controllers/productController");
const authenticateUid = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/save", authenticateUid, saveProduct);

module.exports = router;
