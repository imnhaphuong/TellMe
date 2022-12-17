const express = require("express");
const conversController = require("../controllers/conversController");
const router = express.Router();

//get all users
router.post("/", conversController.createConversation);

module.exports = router;
