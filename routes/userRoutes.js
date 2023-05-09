const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Rutas relacionadas a los usuarios:
// ...

router.get("/", userController.index);
router.get("/crear", userController.create);
router.post("/", userController.store);
router.get("/:id", userController.show);
router.get("/:id/editar", userController.edit);
router.patch("/:id", userController.update);
router.delete("/:id", userController.destroy);
router.get("/registro")
router.post("/registro")
router.get("/login")
router.post("/login")
router.get("/logout")


module.exports = router;
