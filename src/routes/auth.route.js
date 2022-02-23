const express = require("express");
const upload = require("../config/upload.config");
const User = require("../models/user.model");

const createToken = require("../utils/generateToken");

const router = express.Router();

router.post("/signup", upload.single('profile_photo'), async (req, res) => {
    try {
        const doesUserExist = await User.findOne({ email: req.body.email });
        if ( doesUserExist ) return res.status(400).json({ status: "failure", msg: "User already exists!" });

        console.log(req.body);

        const user = await User.create({
            ...req.body,
            profile_photo_url: req.file.path
        });

        if ( !user ) return res.status(400).json({ status: "failure", msg: "something went wrong while creating!" });
        
        res.status(201).json({status:"sucess", msg: "user created successfully!"});
    } catch (error) {
        res.status(500).json({ status: "failure", msg: "Something went wrong!" });
    }
});

router.post("/login", upload.single(), async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if ( !user ) return res.status(401).json({ status: "failure", msg: "Email or password is incorrect!" });

        const isSame = user.comparePassword(req.body.password);
        if ( !isSame ) return res.status(401).json({ status: "failure", msg: "Email or password is incorrect!" });
        
        const token = createToken(user);
        
        res.status(200).json({status:"sucess", msg: "Login successful!", token: token });
    } catch (error) {
        res.status(500).json({ status: "failure", msg: "Something went wrong!" });
    }
});


module.exports = router;