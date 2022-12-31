const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const authMiddleware = require('../auth/auth.middlewares');
const isAuth = authMiddleware.isAuth;

//get all users
router.post("/signin", userController.signin);
router.post("/signup", userController.signup);
router.get("/",isAuth, userController.getAllUsers);
router.post("/id", isAuth, userController.getUserByID);
router.post("/verifyOTP", userController.verifyOTP);
router.post("/email", userController.getUserByEmail);
router.post("/updatePassword", userController.updatePassword);
router.post("/search", userController.getUserByEmailOrPhone);
router.post('/refresh',isAuth, userController.refreshToken);
router.get('/checkLogin',isAuth, userController.checkLogin);
router.get('/profile', isAuth, async (req, res) => {
	res.send(req.user);
});

module.exports = router;
