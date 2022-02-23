const {body} = require("express-validator");

const newLecture = [
    body('title').not().isEmpty().withMessage("title is required!").isString().withMessage("title needs to be string!"),
    body('batch').not().isEmpty().withMessage("batch is required!").isString().withMessage("batch needs to be string!")
];

const updateLecture = [
    body('title').isString().withMessage("title needs to be string!"),
    body('batch').isString().withMessage("batch needs to be string!")
];

module.exports = {
    newLecture,
    updateLecture
};