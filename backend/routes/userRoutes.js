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
router.post("/verifyOTP",isAuth, userController.verifyOTP);
router.post("/email",isAuth, userController.getUserByEmail);
router.post("/updatePassword",isAuth, userController.updatePassword);
router.post("/search",isAuth, userController.getUserByEmailOrPhone);
router.post('/refresh',isAuth, userController.refreshToken);
router.get('/checkLogin',isAuth, userController.checkLogin);
router.get('/profile', isAuth, async (req, res) => {
	res.send(req.user);
});

module.exports = router;
