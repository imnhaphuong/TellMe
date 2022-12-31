const express = require("express");
const callController = require("../controllers/callController");
const router = express.Router();

//get all users
router.post("/", callController.getAllCallsByUID);
router.post("/add", callController.addCall);


module.exports = router;
