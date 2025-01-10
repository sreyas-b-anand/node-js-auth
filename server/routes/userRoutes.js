const express = require("express");
const { signinUser, loginUser, forgotPassword, resetPassword } = require("../controllers/userController");

const router = express.Router();

router.post('/signup' , signinUser)
router.post('/login' ,loginUser)
router.post('/forgot-password' ,forgotPassword)
router.post('/reset-password/:token' ,resetPassword)
module.exports = router