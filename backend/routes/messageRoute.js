const express = require("express");
const messController = require("../controllers/messageController");
const router = express.Router();

//get all users
router.get("/", messController.getAllMessages);
router.post("/send", messController.sendMess);
router.get("/:conversationId",messController.getMessByConvers)

module.exports = router;
