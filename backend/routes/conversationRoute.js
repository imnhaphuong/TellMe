const express = require("express");
const conversController = require("../controllers/conversController");
const router = express.Router();

//get all users
router.get("/",conversController.getAllConvers);
router.get("/:converId",conversController.getConverById);
router.post("/create", conversController.createConversation);
router.get("/userId/:userId", conversController.getConverOfUser);

module.exports = router;
