const mongoose = require("mongoose");

const lectureSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    batch: {
        type: String,
        required: true
    }
});

const Lecture = mongoose.model('Lecture', lectureSchema);
module.exports = Lecture;