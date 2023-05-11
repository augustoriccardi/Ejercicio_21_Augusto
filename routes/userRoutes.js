const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
// Rutas relacionadas a los usuarios:
// ...

router.get("/logout", userController.logout);
router.get("/", userController.index);
router.get("/registro", userController.create);
router.post("/registro", userController.store);
router.get("/:id", userController.show);
router.get("/:id/editar", ensureAuthenticated, userController.edit);
router.patch("/:id", ensureAuthenticated, userController.update);
router.delete("/:id", ensureAuthenticated, userController.destroy);

module.exports = router;
