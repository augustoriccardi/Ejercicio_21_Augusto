const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController");
const adminController = require("../controllers/articleController");

router.get("/", pagesController.showHome);
router.get("/api/articulos", pagesController.indexjson);
router.get("/admin", adminController.index);
module.exports = router;
