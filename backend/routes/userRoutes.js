const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const authMiddleware = require('../auth/auth.middlewares');
const isAuth = authMiddleware.isAuth;
//get all users
router.post("/email", userController.getUserByEmail);
router.post("/verifyOTP", userController.verifyOTP);
router.post("/updatePassword", userController.updatePassword);
router.post("/signin", userController.signin);
router.post("/signup", userController.signup);
router.get("/", userController.getAllUsers);
router.post("/id", userController.getUserByID);
router.post("/search", userController.getUserByEmailOrPhone);
router.post('/refresh', userController.refreshToken);
router.get('/checkLogin', userController.checkLogin);
router.get('/profile', async (req, res) => {
	res.send(req.user);
});

module.exports = router;
