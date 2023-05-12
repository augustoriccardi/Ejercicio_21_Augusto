const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController");
const authController = require("../controllers/authController");
const makeUserAvailableInViews = require("../middlewares/makeUserAvailableInViews");

router.get("/", makeUserAvailableInViews, pagesController.showHome);
router.get("/api/articulos", pagesController.indexjson);
router.get("/login", makeUserAvailableInViews, pagesController.login);
router.post("/login", authController.login);

module.exports = router;
