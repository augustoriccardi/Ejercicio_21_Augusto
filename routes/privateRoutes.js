const express = require("express");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const authController = require("../controllers/authController");
const router = express.Router();

router.get("/welcome", ensureAuthenticated, function (req, res) {
  res.send(`Te damos la bienvenida, ${req.user.firstname}!!`);
});

router.post("/login", authController.login);

module.exports = router;
