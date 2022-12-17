const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

//get all users
router.get("/", userController.getAllUsers);
router.post("/id", userController.getUserByID);
router.post("/signup", userController.signup);
router.post("/verifyOTP", userController.verifyOTP);


module.exports = router;
