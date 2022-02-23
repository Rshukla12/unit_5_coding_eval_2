const jwt = require("jsonwebtoken");

const createToken = (user) => {
    return jwt.sign({
        id: user._id
    }, process.env.SECRET, {
        expiresIn: '1h'
    });
};

module.exports = createToken;