const express = require("express");
const adminController = require("../controllers/adminController");
const userController = require("../controllers/userController");
const commentController = require("../controllers/commentController");
const ensureAdmin = require("../middlewares/ensureAdmin");
const ensureEditor = require("../middlewares/ensureEditor");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const makeUserAvailableInViews = require("../middlewares/makeUserAvailableInViews");
const router = express.Router();

router.get(
  "/admin",
  ensureAuthenticated,
  ensureAdmin,
  makeUserAvailableInViews,
  adminController.showArticles,
);

router.get(
  "/bd-users",
  ensureAuthenticated,
  ensureAdmin,
  makeUserAvailableInViews,
  adminController.showUsers,
);

router.get(
  "/bd-users/crear",
  ensureAuthenticated,
  ensureAdmin,
  makeUserAvailableInViews,
  userController.create,
);

router.get(
  "/bd-comments",
  ensureAuthenticated,
  ensureEditor,
  makeUserAvailableInViews,
  adminController.showComments,
);
router.get(
  "/bd-comments/crear",
  ensureAuthenticated,
  ensureEditor,
  makeUserAvailableInViews,
  adminController.editComment,
);
router.get("/bd-users/:id/editar", ensureAuthenticated, ensureAdmin, makeUserAvailableInViews);
router.patch("/bd-users/:id", adminController.updateUser);
router.delete("/bd-users/:id", adminController.destroyUser);
router.get(
  "/bd-comments/:id/editar",
  ensureAuthenticated,
  ensureEditor,
  makeUserAvailableInViews,
  adminController.editComment,
);

router.patch("/bd-comments/:id", ensureAuthenticated, adminController.updateComment);
router.delete("/bd-comments/:id", ensureAuthenticated, ensureEditor, commentController.destroy);

module.exports = router;
