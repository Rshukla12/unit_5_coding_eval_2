const express = require("express");
const upload = require("../config/upload.config");

const userController = require("../controllers/user.controller");

const router = express.Router();

// taking input in form data because we have to upload a photo with data and multer seems to deocde form data
router.post("/signup", upload.single('profile_photo'), userController.signup);

// taking input in form data to make all input taking uniform
router.post("/login", upload.single(), userController.login);

module.exports = router;