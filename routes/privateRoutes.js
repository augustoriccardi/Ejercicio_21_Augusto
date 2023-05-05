const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");

router.get("/admin/crear", articleController.create);
router.get("/admin/editar", articleController.update);
module.exports = router;
