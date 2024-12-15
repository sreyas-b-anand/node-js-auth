const express = require("express");
const { signinUser, loginUser } = require("../controllers/userController");

const router = express.Router();

router.post('/signup' , signinUser)
router.post('/login' ,loginUser)

module.exports = router