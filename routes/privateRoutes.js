const express = require("express");
const adminController = require("../controllers/adminController");
const ensureAdmin = require("../middlewares/ensureAdmin");
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
  adminController.createUser,
);
router.get("/bd-users/:id/editar", ensureAuthenticated, ensureAdmin, makeUserAvailableInViews);
router.patch("/bd-users/:id", adminController.updateUser);
router.delete("/bd-users/:id", adminController.destroyUser);

router.get(
  "/bd-comments",
  ensureAuthenticated,
  ensureAdmin,
  makeUserAvailableInViews,
  adminController.showComments,
);
router.get(
  "/bd-comments/crear",
  ensureAuthenticated,
  ensureAdmin,
  makeUserAvailableInViews,
  adminController.editComment,
);
router.get(
  "/bd-comments/:id/editar",
  ensureAuthenticated,
  ensureAdmin,
  makeUserAvailableInViews,
  adminController.editComment,
);
router.patch("/bd-comments/:id", adminController.updateComment);
router.delete("/bd-comments/:id", adminController.destroyUser);

module.exports = router;
