const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

//get all users
router.get("/", userController.getAllUsers);
router.post("/id", userController.getUserByID);
router.post("/signup", userController.signup);
router.post("/verifyOTP", userController.verifyOTP);
router.post("/signin", userController.signin);
router.post("/email", userController.getUserByEmail);
router.post("/updatePassword", userController.updatePassword);
router.post("/search", userController.getUserByEmailOrPhone);

module.exports = router;
