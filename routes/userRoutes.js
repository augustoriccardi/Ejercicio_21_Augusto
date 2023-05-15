const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const makeUserAvailableInViews = require("../middlewares/makeUserAvailableInViews");

//Middlewares de permisos
const canCreateArticle = require("../middlewares/canCreateArticle");
const canCreateComment = require("../middlewares/canCreateComment");
const canCreateUser = require("../middlewares/canCreateUser");
const canDeleteArticle = require("../middlewares/canDeleteArticle");
const canDeleteUser = require("../middlewares/canDeleteUser");
const canEditArticle = require("../middlewares/canEditArticle");
const canEditComment = require("../middlewares/canEditComment");
const canEditUser = require("../middlewares/canEditUser");

router.get("/logout", userController.logout);
router.get("/", makeUserAvailableInViews, userController.index);
router.get("/registro", makeUserAvailableInViews, userController.create);
router.post("/registro", userController.store);
router.get(
  "/mis-articulos",
  ensureAuthenticated,
  makeUserAvailableInViews,
  userController.showMyArticles,
);
router.get("/:id/editar", ensureAuthenticated, makeUserAvailableInViews, userController.edit);
router.patch("/:id", ensureAuthenticated, userController.update);
router.delete("/:id", ensureAuthenticated, userController.destroy);

module.exports = router;
