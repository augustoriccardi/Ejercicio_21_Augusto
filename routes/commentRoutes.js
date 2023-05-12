const express = require("express");
const commentController = require("../controllers/commentController");
const router = express.Router();

router.post("/crear/:id", commentController.create);

module.exports = router;
