const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const makeUserAvailableInViews = require("../middlewares/makeUserAvailableInViews");

//Middlewares de permisos
const canCreateArticle = require("../middlewares/canCreateArticle");
const canDeleteArticle = require("../middlewares/canDeleteArticle");
const canEditArticle = require("../middlewares/canEditArticle");

router.get(
  "/crear",
  ensureAuthenticated,
  canCreateArticle,
  makeUserAvailableInViews,
  articleController.create,
);
router.post("/", ensureAuthenticated, canCreateArticle, articleController.store);
router.get("/:id", makeUserAvailableInViews, makeUserAvailableInViews, articleController.show);
router.get(
  "/:id/editar",
  ensureAuthenticated,
  canEditArticle,
  makeUserAvailableInViews,
  articleController.edit,
);
router.patch("/:id", ensureAuthenticated, canEditArticle, articleController.update);
router.delete("/:id", ensureAuthenticated, canDeleteArticle, articleController.destroy);

module.exports = router;
