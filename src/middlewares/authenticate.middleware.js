const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authenticate = async (req, res, next) => {
    try {
        const auth = req.headers.authorization;
        if ( !auth || !auth.startsWith("Bearer ") ) return res.status(400).json({ status:"failure", msg:"Imporper authorization or missing token" })
        const token = auth.split("Bearer ")[1].trim();
        let userData;
        try {
            userData = jwt.verify( auth, process.env.SECRET );
        } catch ( err ) {
            return res.status(401).json("Invalid or expired token!");
        }
        const user = await User.findById(userData.id);
        if ( !user ) res.status(401).json("Invalid or expired token!");
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json("something went wrong!");
    }
}

module.exports = authenticate;