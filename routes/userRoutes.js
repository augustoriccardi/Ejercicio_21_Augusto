const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const makeUserAvailableInViews = require("../middlewares/makeUserAvailableInViews");

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
