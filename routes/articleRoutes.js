const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const makeUserAvailableInViews = require("../middlewares/makeUserAvailableInViews");

router.get("/crear", ensureAuthenticated, makeUserAvailableInViews, articleController.create);
router.post("/", ensureAuthenticated, articleController.store);
router.get("/:id", makeUserAvailableInViews, makeUserAvailableInViews, articleController.show);
router.get("/:id/editar", ensureAuthenticated, makeUserAvailableInViews, articleController.edit);
router.patch("/:id", ensureAuthenticated, articleController.update);
router.delete("/:id", ensureAuthenticated, articleController.destroy);

module.exports = router;
