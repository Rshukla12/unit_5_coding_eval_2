const {body} = require("express-validator");

module.exports = [
    body('email').not().isEmpty().withMessage("email is required!").isEmail().withMessage("Email needs to be valid email!"),
    body('name').not().isEmpty().withMessage("name is required!").isString().withMessage("name needs to be string!"),
    body('password').not().isEmpty().withMessage("password is required!"),
    body('roles').not().isEmpty().withMessage("roles is required!").isString().withMessage("roles needs to be string and of value 'admin', 'student' or 'instructor'!")
];