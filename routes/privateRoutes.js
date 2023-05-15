const express = require("express");
const adminController = require("../controllers/adminController");
const userController = require("../controllers/userController");
const commentController = require("../controllers/commentController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const makeUserAvailableInViews = require("../middlewares/makeUserAvailableInViews");
const router = express.Router();

//Middlewares de permisos
const canCreateUser = require("../middlewares/canCreateUser");
const canDeleteUser = require("../middlewares/canDeleteUser");
const canEditComment = require("../middlewares/canEditComment");
const canEditUser = require("../middlewares/canEditUser");
const canViewArticles = require("../middlewares/canViewArticles");
const canViewComments = require("../middlewares/canViewComments");
const canViewUsers = require("../middlewares/canViewUsers");
const canDeleteComment = require("../middlewares/canDeleteComment");

router.get(
  "/admin",
  ensureAuthenticated,
  canViewArticles,
  makeUserAvailableInViews,
  adminController.showArticles,
);

router.get(
  "/bd-users",
  ensureAuthenticated,
  canViewUsers,
  makeUserAvailableInViews,
  adminController.showUsers,
);

router.get(
  "/bd-users/crear",
  ensureAuthenticated,
  canCreateUser,
  makeUserAvailableInViews,
  userController.create,
);

router.get("/bd-users/:id/editar", ensureAuthenticated, canEditUser, makeUserAvailableInViews);

router.patch(
  "/bd-users/:id",
  ensureAuthenticated,
  canEditUser,
  makeUserAvailableInViews,
  adminController.updateUser,
);

router.delete(
  "/bd-users/:id",
  ensureAuthenticated,
  canDeleteUser,
  makeUserAvailableInViews,
  adminController.destroyUser,
);

router.get(
  "/bd-comments",
  ensureAuthenticated,
  canViewComments,
  makeUserAvailableInViews,
  adminController.showComments,
);
router.get(
  "/bd-comments/crear",
  ensureAuthenticated,
  canEditComment,
  makeUserAvailableInViews,
  adminController.editComment,
);

router.get(
  "/bd-comments/:id/editar",
  ensureAuthenticated,
  canEditComment,
  makeUserAvailableInViews,
  adminController.editComment,
);

router.patch("/bd-comments/:id", ensureAuthenticated, adminController.updateComment);
router.delete("/bd-comments/:id", ensureAuthenticated, canDeleteComment, commentController.destroy);

module.exports = router;
