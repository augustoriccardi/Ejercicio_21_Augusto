const express = require("express");
const commentController = require("../controllers/commentController");
const router = express.Router();

//Middlewares de permisos
const canCreateComment = require("../middlewares/canCreateComment");
const canCreateUser = require("../middlewares/canCreateUser");
const canEditComment = require("../middlewares/canEditComment");

router.post("/crear/:id", commentController.create);

module.exports = router;
