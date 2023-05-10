const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController");

router.get("/", pagesController.showHome);
router.get("/api/articulos", pagesController.indexjson);
router.get("/admin", pagesController.indexAdmin);
router.get("/login", pagesController.login);

module.exports = router;
