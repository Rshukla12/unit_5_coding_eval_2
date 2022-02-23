const express = require("express");
const upload = require("../config/upload.config");

const userController = require("../controllers/user.controller");

const router = express.Router();

router.post("/signup", upload.single('profile_photo'), userController.signup);

router.post("/login", upload.single(), userController.login);

module.exports = router;