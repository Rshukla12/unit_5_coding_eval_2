const Student = require("../models/student.model");
const User = require("../models/user.model");

const createToken = require("../utils/generateToken");

const signup = async (req, res) => {
    try {
        const doesUserExist = await User.findOne({ email: req.body.email });
        if ( doesUserExist ) return res.status(400).json({ status: "failure", msg: "User already exists!" });

        const user = await User.create({
            ...req.body,
            profile_photo_url: req.file.path
        });

        if ( user.roles === "student"){
            await Student.create({
                rollnumber: req.body.rollnumber,
                batch: req.body.batch,
                user: user._id
            });
        }

        if ( !user ) return res.status(400).json({ status: "failure", msg: "something went wrong while creating!" });
        
        const token = createToken(user);
        
        res.status(201).json({status:"sucess", msg: "user created successfully!", token: token});
    } catch (error) {
        res.status(500).json({ status: "failure", msg: "Something went wrong!" });
    }
};

const login = async (req, res) => {
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
};

module.exports = {
    signup,
    login
}