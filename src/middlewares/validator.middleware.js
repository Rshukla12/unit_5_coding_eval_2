const { validatoionResult } = require("express-validator");

const validator = (req, res, next) => {
    const errors = validatoionResult(req);
    if ( !errors.isEmpty() ) return res.status(400).json({ status: "failure", msg: "Invalid input!", error: errors.array()});
    next();
};

module.exports = validator;