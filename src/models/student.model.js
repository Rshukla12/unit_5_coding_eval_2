const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    rollnumber: {
        type: Number,
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

const Student = mongoose.model('Stundet', studentSchema);
module.exports = Student;