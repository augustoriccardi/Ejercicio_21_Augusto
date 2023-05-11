const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const makeUserAvailableInViews = require("../middlewares/makeUserAvailableInViews");
// Rutas relacionadas a los artículos:
// ...

router.get("/", articleController.index);
router.get("/crear", ensureAuthenticated, articleController.create);
router.post("/", ensureAuthenticated, articleController.store);
router.get("/:id", makeUserAvailableInViews, articleController.show);
router.get("/:id/editar", ensureAuthenticated, articleController.edit);
router.patch("/:id", ensureAuthenticated, articleController.update);
router.delete("/:id", ensureAuthenticated, articleController.destroy);

module.exports = router;
