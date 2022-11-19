const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const User = require("../models/user");

router.get("/", userController.getAllUser);

module.exports = router;
